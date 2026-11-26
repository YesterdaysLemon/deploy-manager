// Test helper: a software passkey that signs WebAuthn assertions the way a
// phone would. Not a test file itself.
import crypto from "node:crypto";

import { b64url, challengeFor, sha256 } from "../bin/approval-gate.mjs";

export const RP_ID = "deploy.example.com";
export const ORIGIN = `https://${RP_ID}`;

export function softwarePasskey({ rpId = RP_ID, origin = ORIGIN } = {}) {
  const { privateKey, publicKey } = crypto.generateKeyPairSync("ec", { namedCurve: "P-256" });
  const credentialId = b64url(crypto.randomBytes(16));
  const approver = {
    credentialId,
    alg: -7,
    publicKey: publicKey.export({ type: "spki", format: "pem" }),
    rpId,
    origin,
  };
  function sign(askBytes, { nonce, flags = 0x05, type = "webauthn.get", challenge, signOrigin = origin, signRpId = rpId } = {}) {
    const clientData = Buffer.from(JSON.stringify({
      type,
      challenge: challenge ?? challengeFor(askBytes),
      origin: signOrigin,
      crossOrigin: false,
    }));
    const counter = Buffer.alloc(4);
    const authData = Buffer.concat([sha256(signRpId), Buffer.from([flags]), counter]);
    const signature = crypto.sign("sha256", Buffer.concat([authData, sha256(clientData)]), privateKey);
    return {
      decision: "approve",
      nonce: nonce ?? JSON.parse(askBytes.toString("utf8")).nonce,
      credentialId,
      authenticatorData: b64url(authData),
      clientDataJSON: b64url(clientData),
      signature: b64url(signature),
    };
  }
  return { approver, sign, publicKey };
}

