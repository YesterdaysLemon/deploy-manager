# Approval gate: a passkey yes before production changes

With `REQUIRE_APPROVAL=yes` in an app's root env file, a release builds and
health-checks its candidate as usual, then stops and waits. Production is
swapped only after you approve that exact release with a passkey on your
phone. The yes covers one app, one commit and one built image ID, works once,
and expires.

## How a gated release runs

1. The candidate passes its health check and is removed, as before.
2. The root rollout reads the built image's ID and writes an ask to
   `/var/lib/deploy-manager-approvals/<nonce>.json`: app, commit, image ID, a
   random nonce, when it opened and when it expires (15 minutes by default).
   The ask is canonical JSON, so the same ask always has the same hash.
3. The release receipt shows the phase `approval`. Open `/approve` on the
   manager's site. The page decodes the ask from the exact bytes it will sign
   and shows them.
4. **Approve with passkey** signs a WebAuthn challenge that is the SHA-256 of
   those bytes, with user verification required. The manager checks the
   signature as early feedback, so a fumbled tap is turned back rather than
   failing the release, and writes the answer to its own state directory.
5. The root rollout reads the answer and checks it again, independently: the
   signature against the enrolled public key, the challenge against its own
   copy of the ask, the origin, the relying party, user presence and
   verification, and the expiry. It then records the nonce as spent with an
   exclusive create, so the same yes can never be used twice.
6. Right before the swap it checks that the image tag still points at the
   approved image ID; after starting production it checks that the running
   container uses that ID, and rolls back if not.

Deny, a refused answer, no answer before the expiry or a stop signal all end
the release with production untouched.

## What the manager can and cannot do

The manager is unprivileged and web-facing, so the design assumes it can be
compromised.

- It cannot approve anything. Without your passkey it cannot produce a
  signature the root side accepts.
- It cannot change what you approve. The challenge is the hash of the root's
  own ask file; any other bytes produce a different challenge, and the root
  refuses it.
- It cannot enroll a key. Enrollment only prints a record; it counts once you
  copy it to `/etc/deploy-manager/approver.json` as root.
- It can deny or stall a release. That only ever leaves production as it was.

The root side reads answers without following links, only as small regular
files, and writes nothing into the manager's directories.

## Setup

1. **Install the new root plane.** `bin/approval-gate.mjs` and the changed
   `bin/deploy-app.sh` are root-plane files, so re-run the bootstrap
   (`docs/self-update.md`) after merging. The self-updater does not replace
   them on its own.
2. **Tell the manager its relying party.** Add to the manager's environment:

   ```
   DEPLOY_MANAGER_APPROVAL_RP_ID=deploy.example.com
   DEPLOY_MANAGER_APPROVAL_ORIGIN=https://deploy.example.com
   ```

   A passkey is bound to its relying party ID, so pick it once. The RP ID may
   be the parent domain of the page's hostname: with
   `DEPLOY_MANAGER_APPROVAL_RP_ID=example.com` and the origin
   `https://deploy.example.com`, the same passkey also works for any later
   approval page on another subdomain of `example.com`.
3. **Enroll each key.** Open `/enroll`, name the key ("phone", "keychain
   YubiKey"), create the passkey, and run the command the page shows on the
   server. It adds that key to `/etc/deploy-manager/approver.json` and keeps
   the ones already there:

   ```
   printf '%s\n' '<record from the page>' | sudo node /usr/local/libexec/deploy-manager/approval-gate.mjs add-approver --file /etc/deploy-manager/approver.json
   ```

   Enroll more than one. Any enrolled key can approve on its own, so losing
   one never locks you out. A phone passkey syncs through its platform's
   keychain; a hardware security key stays on the key and cannot be copied,
   which is why a second one on a keychain is the backup. Nothing secret
   needs saving elsewhere: the server holds only public keys.

   To see or remove keys, as root:

   ```
   node /usr/local/libexec/deploy-manager/approval-gate.mjs list-approvers --file /etc/deploy-manager/approver.json
   node /usr/local/libexec/deploy-manager/approval-gate.mjs remove-approver --file /etc/deploy-manager/approver.json --credential <id>
   ```

   The last key can't be removed; enroll its replacement first. The first
   single-record format of `approver.json` still works.

4. **Put it on your phone.** Open `/approve` and add it to the home screen;
   it opens like an app and checks for new asks every few seconds while
   open.
5. **Gate one app.** Add `REQUIRE_APPROVAL=yes` to that app's
   `/etc/deploy-manager/apps/<app>.env`. Other apps are unchanged.

Optional settings in the app env file: `APPROVAL_TTL_SECONDS` (default 900,
between 5 and 86400), `APPROVAL_POLL_SECONDS` (default 2), and the paths
`APPROVAL_ASK_DIR`, `APPROVAL_ANSWER_DIR`, `APPROVAL_SPENT_DIR`,
`APPROVER_FILE`.

## Things to know

- **The release lane stays busy while it waits,** so the self-updater waits
  too. Keep the expiry shorter than your CI's receipt polling (the example
  workflow polls for 20 minutes).
- **Stateful services are not gated yet.** `REQUIRE_APPROVAL=yes` together
  with `STATEFUL_RUNTIME_FILE` fails before the build.
- **Any value other than `yes` or `no` fails closed.**
- **Keep your manual swap and rollback.** The gate only adds a wait; the
  operator paths in `docs/self-update.md` still work.
- **Approve from a device the agents don't run on.** The page shows exactly
  what is signed, but a compromised computer can show you one thing and ask
  you to sign another. A phone, or a security key tapped to the phone, keeps
  the yes away from the machines that do the work.
