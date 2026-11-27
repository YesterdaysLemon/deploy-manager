// Approval routes for the unprivileged manager (docs/approval.md).
//
// The manager shows open asks, gives early feedback on a passkey answer and
// hands the answer to the root rollout through a file. It never decides: the
// root side verifies every answer again and spends each yes once. Enrollment
// only turns a passkey registration into an approver record for the operator
// to install as root; the manager cannot install it.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import {
  ApprovalError,
  approversFrom,
  b64url,
  parseAsk,
  parseRegistration,
  readSmallFile,
  verifyAssertion,
} from "../bin/approval-gate.mjs";

const NONCE = /^[0-9a-f]{32}$/;
const ENROLL_CHALLENGE_MS = 5 * 60 * 1000;

export function createApprovalRoutes({
  askDir,
  answerDir,
  approverFile,
  rpId,
  origin,
  readBody,
  sendJson,
}) {
  const enrollChallenges = new Map();

  function approvers() {
    try {
      return approversFrom(JSON.parse(readSmallFile(approverFile).toString("utf8")));
    } catch {
      return [];
    }
  }

  function openAsks() {
    let names = [];
    try {
      names = fs.readdirSync(askDir).filter((name) => NONCE.test(name.replace(/\.json$/, "")) && name.endsWith(".json"));
    } catch {
      return [];
    }
    const now = Math.floor(Date.now() / 1000);
    const asks = [];
    for (const name of names) {
      try {
        const bytes = readSmallFile(path.join(askDir, name));
        const ask = parseAsk(bytes);
        if (ask.expires_at > now) asks.push({ ...ask, askB64: b64url(bytes) });
      } catch {
        // An unreadable or malformed ask is skipped; the root side owns it.
      }
    }
    return asks.sort((a, b) => a.created_at - b.created_at);
  }

  // Answers for asks that are gone are the manager's to tidy.
  function tidyAnswers(open) {
    const live = new Set(open.map((ask) => `${ask.nonce}.json`));
    let names = [];
    try {
      names = fs.readdirSync(answerDir);
    } catch {
      return;
    }
    for (const name of names) {
      if (!live.has(name)) fs.rmSync(path.join(answerDir, name), { force: true });
    }
  }

  function sameOrigin(request) {
    return !origin || request.headers.origin === origin;
  }

  async function jsonBody(request, response) {
    try {
      return JSON.parse((await readBody(request)).toString("utf8"));
    } catch (error) {
      sendJson(request, response, error.message === "request_too_large" ? 413 : 400, { ok: false, error: "bad_request" });
      return null;
    }
  }

  function writeAnswer(nonce, answer) {
    fs.mkdirSync(answerDir, { recursive: true, mode: 0o700 });
    const final = path.join(answerDir, `${nonce}.json`);
    if (fs.existsSync(final)) throw new ApprovalError("already_answered");
    const temporary = path.join(answerDir, `.${nonce}.${crypto.randomBytes(4).toString("hex")}.tmp`);
    fs.writeFileSync(temporary, JSON.stringify(answer), { mode: 0o600, flag: "wx" });
    fs.renameSync(temporary, final);
  }

  return async function handle(request, response, url) {
    if (request.method === "GET" && url.pathname === "/api/approvals") {
      const open = openAsks();
      tidyAnswers(open);
      const enrolled = approvers();
      sendJson(request, response, 200, {
        rpId: enrolled[0]?.rpId ?? rpId ?? null,
        approvers: enrolled.map(({ credentialId, label }) => ({ credentialId, label: label ?? "" })),
        enrollment: Boolean(rpId && origin),
        asks: open,
      });
      return true;
    }

    const answerMatch = /^\/api\/approvals\/([0-9a-f]{32})$/.exec(url.pathname);
    if (request.method === "POST" && answerMatch) {
      if (!sameOrigin(request)) {
        sendJson(request, response, 403, { ok: false, error: "wrong_origin" });
        return true;
      }
      const nonce = answerMatch[1];
      const body = await jsonBody(request, response);
      if (!body) return true;
      const ask = openAsks().find((item) => item.nonce === nonce);
      if (!ask) {
        sendJson(request, response, 404, { ok: false, error: "no_open_ask" });
        return true;
      }
      try {
        let answer;
        if (body.decision === "deny") {
          answer = { decision: "deny", nonce };
        } else if (body.decision === "approve") {
          answer = {
            decision: "approve",
            nonce,
            credentialId: body.credentialId,
            authenticatorData: body.authenticatorData,
            clientDataJSON: body.clientDataJSON,
            signature: body.signature,
          };
          // Early feedback only: a fumbled tap is turned back here so the
          // release is not failed by the root check. Root checks again.
          const enrolled = approvers();
          if (enrolled.length === 0) throw new ApprovalError("approval_no_approver_enrolled");
          verifyAssertion({ askBytes: Buffer.from(ask.askB64, "base64url"), assertion: answer, approvers: enrolled });
        } else {
          throw new ApprovalError("answer_decision_unknown");
        }
        writeAnswer(nonce, answer);
        sendJson(request, response, 202, { ok: true, decision: answer.decision });
      } catch (error) {
        const code = error instanceof ApprovalError ? error.code : "answer_not_saved";
        sendJson(request, response, code === "already_answered" ? 409 : 400, { ok: false, error: code });
      }
      return true;
    }

    if (request.method === "POST" && url.pathname === "/api/enroll/options") {
      if (!rpId || !origin) {
        sendJson(request, response, 404, { ok: false, error: "enrollment_not_configured" });
        return true;
      }
      if (!sameOrigin(request)) {
        sendJson(request, response, 403, { ok: false, error: "wrong_origin" });
        return true;
      }
      const now = Date.now();
      for (const [challenge, expires] of enrollChallenges) if (expires < now) enrollChallenges.delete(challenge);
      if (enrollChallenges.size > 32) {
        sendJson(request, response, 429, { ok: false, error: "too_many_enrollments" });
        return true;
      }
      const challenge = b64url(crypto.randomBytes(32));
      enrollChallenges.set(challenge, now + ENROLL_CHALLENGE_MS);
      sendJson(request, response, 200, {
        challenge,
        rp: { id: rpId, name: "Deploy Manager" },
        user: { id: b64url(crypto.randomBytes(16)), name: "approver", displayName: "Deploy Manager approver" },
        pubKeyCredParams: [{ type: "public-key", alg: -7 }, { type: "public-key", alg: -8 }],
        authenticatorSelection: { userVerification: "required", residentKey: "preferred" },
        // Already-enrolled authenticators are excluded, so one key is never enrolled twice.
        excludeCredentials: approvers().map(({ credentialId }) => ({ type: "public-key", id: credentialId })),
        attestation: "none",
        timeout: 120000,
      });
      return true;
    }

    if (request.method === "POST" && url.pathname === "/api/enroll/finish") {
      if (!rpId || !origin) {
        sendJson(request, response, 404, { ok: false, error: "enrollment_not_configured" });
        return true;
      }
      if (!sameOrigin(request)) {
        sendJson(request, response, 403, { ok: false, error: "wrong_origin" });
        return true;
      }
      const body = await jsonBody(request, response);
      if (!body) return true;
      const expires = enrollChallenges.get(body.challenge);
      enrollChallenges.delete(body.challenge);
      if (!expires || expires < Date.now()) {
        sendJson(request, response, 400, { ok: false, error: "challenge_unknown_or_expired" });
        return true;
      }
      try {
        const record = parseRegistration({
          attestationObject: body.attestationObject,
          clientDataJSON: body.clientDataJSON,
          challenge: body.challenge,
          rpId,
          origin,
          label: body.label,
        });
        sendJson(request, response, 200, {
          ok: true,
          approver: record,
          install: `printf '%s\\n' '${JSON.stringify(record)}' | sudo node /usr/local/libexec/deploy-manager/approval-gate.mjs add-approver --file ${approverFile}`,
        });
      } catch (error) {
        sendJson(request, response, 400, { ok: false, error: error instanceof ApprovalError ? error.code : "registration_unreadable" });
      }
      return true;
    }

    return false;
  };
}
