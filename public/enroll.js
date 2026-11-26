"use strict";

const toBytes = (b64url) => Uint8Array.from(atob(b64url.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(b64url.length / 4) * 4, "=")), (c) => c.charCodeAt(0));
const toB64url = (buffer) => btoa(String.fromCharCode(...new Uint8Array(buffer))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

document.getElementById("enroll").addEventListener("click", async () => {
  const status = document.getElementById("status");
  status.className = "status";
  status.textContent = "Waiting for your passkey…";
  try {
    const optionsResponse = await fetch("/api/enroll/options", { method: "POST" });
    const options = await optionsResponse.json();
    if (!optionsResponse.ok) throw new Error(options.error ?? optionsResponse.status);
    const credential = await navigator.credentials.create({
      publicKey: {
        ...options,
        challenge: toBytes(options.challenge),
        user: { ...options.user, id: toBytes(options.user.id) },
      },
    });
    const finish = await fetch("/api/enroll/finish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        challenge: options.challenge,
        attestationObject: toB64url(credential.response.attestationObject),
        clientDataJSON: toB64url(credential.response.clientDataJSON),
      }),
    });
    const result = await finish.json();
    if (!finish.ok) throw new Error(result.error ?? finish.status);
    document.getElementById("record").value = `${JSON.stringify(result.approver, null, 2)}\n`;
    document.getElementById("install").textContent = result.install;
    document.getElementById("result").hidden = false;
    status.textContent = "Passkey created.";
  } catch (error) {
    status.className = "status bad";
    status.textContent = `Not enrolled: ${error.message}`;
  }
});
