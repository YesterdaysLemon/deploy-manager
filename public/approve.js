"use strict";

const toBytes = (b64url) => Uint8Array.from(atob(b64url.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(b64url.length / 4) * 4, "=")), (c) => c.charCodeAt(0));
const toB64url = (buffer) => btoa(String.fromCharCode(...new Uint8Array(buffer))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

function field(list, name, value) {
  const dt = document.createElement("dt");
  dt.textContent = name;
  const dd = document.createElement("dd");
  dd.textContent = value;
  list.append(dt, dd);
}

async function answer(nonce, body, status, buttons) {
  buttons.forEach((button) => { button.disabled = true; });
  const response = await fetch(`/api/approvals/${nonce}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const result = await response.json().catch(() => ({}));
  if (response.ok) {
    status.textContent = body.decision === "approve" ? "Approved. The release continues." : "Denied. The release stops here.";
    status.className = "status";
  } else {
    status.textContent = `Not accepted: ${result.error ?? response.status}`;
    status.className = "status bad";
    buttons.forEach((button) => { button.disabled = false; });
  }
}

function render(data) {
  const root = document.getElementById("asks");
  root.replaceChildren();
  if (!data.approver) {
    const p = document.createElement("p");
    p.className = "empty";
    p.textContent = "No passkey is enrolled yet. Enroll one at /enroll first.";
    root.append(p);
  }
  if (!data.asks.length) {
    const p = document.createElement("p");
    p.className = "empty";
    p.textContent = "Nothing is waiting.";
    root.append(p);
    return;
  }
  for (const item of data.asks) {
    // Show what will be signed, decoded from the same bytes that are signed.
    const askBytes = toBytes(item.askB64);
    const ask = JSON.parse(new TextDecoder().decode(askBytes));
    const card = document.createElement("section");
    card.className = "ask";
    const title = document.createElement("h2");
    title.textContent = ask.app;
    const list = document.createElement("dl");
    field(list, "Commit", ask.sha);
    field(list, "Image", ask.image);
    field(list, "Opened", new Date(ask.created_at * 1000).toLocaleString());
    field(list, "Expires", new Date(ask.expires_at * 1000).toLocaleTimeString());
    const actions = document.createElement("div");
    actions.className = "actions";
    const approve = document.createElement("button");
    approve.className = "approve";
    approve.textContent = "Approve with passkey";
    const deny = document.createElement("button");
    deny.className = "deny";
    deny.textContent = "Deny";
    const status = document.createElement("p");
    status.className = "status";
    const buttons = [approve, deny];
    approve.disabled = !data.approver;
    approve.addEventListener("click", async () => {
      try {
        const challenge = await crypto.subtle.digest("SHA-256", askBytes);
        const credential = await navigator.credentials.get({
          publicKey: {
            challenge,
            rpId: data.approver.rpId,
            allowCredentials: [{ type: "public-key", id: toBytes(data.approver.credentialId) }],
            userVerification: "required",
            timeout: 120000,
          },
        });
        await answer(ask.nonce, {
          decision: "approve",
          credentialId: toB64url(credential.rawId),
          authenticatorData: toB64url(credential.response.authenticatorData),
          clientDataJSON: toB64url(credential.response.clientDataJSON),
          signature: toB64url(credential.response.signature),
        }, status, buttons);
      } catch (error) {
        status.textContent = `Passkey not used: ${error.message}`;
        status.className = "status bad";
      }
    });
    deny.addEventListener("click", () => answer(ask.nonce, { decision: "deny" }, status, buttons));
    actions.append(approve, deny);
    card.append(title, list, actions, status);
    root.append(card);
  }
}

let shown = "";
let busy = false;
document.addEventListener("click", (event) => {
  if (event.target instanceof HTMLButtonElement) busy = true;
});

// Checks for new asks every few seconds while the page is open. A page in
// the middle of an answer is left alone; it reloads on the next visit.
async function load() {
  const response = await fetch("/api/approvals", { cache: "no-store" });
  const data = await response.json();
  const key = JSON.stringify([Boolean(data.approver), data.asks.map((ask) => ask.nonce)]);
  if (key !== shown && !busy) {
    shown = key;
    render(data);
  }
}

load().catch((error) => {
  document.getElementById("asks").textContent = `Could not load: ${error.message}`;
});
setInterval(() => {
  if (document.visibilityState === "visible") load().catch(() => {});
}, 5000);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    busy = false;
    load().catch(() => {});
  }
});
