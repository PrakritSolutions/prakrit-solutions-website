# Enquiry tracker (Google Sheet)

Each contact-form enquiry is appended as a row to a private Google Sheet. The
website posts to a small Apps Script web app attached to the Sheet. If the
Sheet is unreachable the form still works: the enquiry email to `hello@` is
the primary record and the failure is only logged.

## One-time setup

1. Create a Google Sheet named **Prakrit Enquiries** in the Workspace account.
   Keep it private (do not share it with anyone else).
2. **Extensions → Apps Script**. Replace the contents of `Code.gs` with the
   contents of [`Code.gs`](./Code.gs) in this folder and save.
3. Pick the `setup` function in the toolbar and click **Run**. Approve the
   permissions when asked. It builds the headers, the Status dropdown, the
   reply-due colouring and sets the Sheet's time zone to IST.
4. **Project Settings (gear) → Script properties → Add script property**:
   name `WEBHOOK_SECRET`, value a long random string (for example the output of
   `openssl rand -hex 24`). Save it somewhere safe; it goes into Vercel too.
5. **Deploy → New deployment → type Web app**. Execute as **Me**, who has access
   **Anyone**. Deploy and copy the **Web app URL** (ends in `/exec`).
   "Anyone" only means the URL is reachable; every request without the secret
   is rejected.
6. In Vercel (Settings → Environment Variables), add for **Preview** first, and
   **Production** at go-live:
   - `SHEETS_WEBHOOK_URL`: the Web app URL
   - `SHEETS_WEBHOOK_SECRET`: the same secret as step 4
   - `SHEETS_URL` (optional): the normal Sheet link, shown as "Open enquiry
     tracker" in the notification email
7. Redeploy so the variables take effect.

## Upgrading a Sheet that already has enquiries
This version adds **Source** (where the enquiry came from) and **Fit** (A, B or C)
columns, and a read-only "list" action used for reporting.
1. Paste the new `Code.gs` over the old one and save.
2. Pick the **`upgrade`** function and click **Run**. It adds the two columns and
   leaves every existing row alone. **Never run `setup()` on a Sheet that has
   enquiries: it clears the sheet.**
3. **Deploy → Manage deployments → edit → New version → Deploy.**

## Changing the script later
Editing `Code.gs` does not update a live deployment. Use **Deploy → Manage
deployments → edit (pencil) → Version: New version → Deploy**. The URL stays
the same.

## Gmail workflow
Create a filter: subject contains `New project enquiry from` → apply label
**Enquiries**, star it, never send to spam. Reply from the thread, then update
**Status** in the Sheet the same day. Rows still marked **New** after their
**Reply due** date turn amber.

## Formula injection
Visitor text starting with `=`, `+`, `-` or `@` is stored with a leading space
(`safeCell` in `Code.gs`) so it stays literal text. After any change to that
function, test with project text `=1+1`: the cell must show `=1+1`, not `2`.

## Retention
The Privacy Policy states enquiry records are kept for 24 months. Delete rows
older than that from the Sheet.
