# Burn timecourse · run sheet

A one-page site that shows the day's tasks for the burn timecourse experiment as a checklist with times, read live from the experiment's Google Sheet. Open it on a phone; no login.

- **Reads only.** The page fetches the Sheet's *Calendar* and *Checks* tabs through the public `gviz` endpoint every 60 s. It never writes to that Sheet.
- **Today view** shows only what matters for the day: AM/PM checks, injuries, bupe windows, TXA doses, harvests, imaging. Sign-ups are never shown; empty sections are hidden.
- **Prep for tomorrow** is driven by the rules in [`prep-rules.js`](prep-rules.js). Edit that file to change what gets prepped.
- **Shared ticks** are live: every phone and computer that opens the page sees the same ticks, each stamped with the initials set in the header pill and the time. They are stored in a *separate* spreadsheet, **Burn Run-Sheet Ticks** (tab *Ticks*: date, key, by, at), behind the small Apps Script web app in [`ticks-backend.gs`](ticks-backend.gs); its `/exec` URL is `TICKS_URL` near the top of `index.html`. The calendar Sheet is still never written to. If the page cannot reach the backend it says so in the footer and keeps ticks on that device.
  - To change the backend: edit `ticks-backend.gs`, paste the whole file into the ticks spreadsheet's script editor (Extensions › Apps Script), save, then Deploy › Manage deployments › ✎ › Version: *New version* › Deploy. The URL stays the same.
  - Leave `TICKS_URL` empty to keep ticks on each device only.

Times are shown in Central time.

## Local preview

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

then open <http://127.0.0.1:8765/>.
