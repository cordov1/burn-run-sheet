# Burn timecourse · run sheet

A one-page site that shows the day's tasks for the burn timecourse experiment as a checklist with times, read live from the experiment's Google Sheet. Open it on a phone; no login.

- **Reads only.** The page fetches the Sheet's *Calendar* and *Checks* tabs through the public `gviz` endpoint every 60 s. It never writes to that Sheet.
- **Today view** shows only what matters for the day: AM/PM checks, injuries, bupe windows, TXA doses, harvests, imaging. Sign-ups are never shown; empty sections are hidden.
- **Prep for tomorrow** is driven by the rules in [`prep-rules.js`](prep-rules.js). Edit that file to change what gets prepped.
- **Shared ticks** (optional) live in a separate spreadsheet behind a tiny Apps Script web app: see the set-up notes at the top of [`ticks-backend.gs`](ticks-backend.gs), then put the `/exec` URL into `TICKS_URL` near the top of `index.html`. Until then, ticks stay on each device.

Times are shown in Central time.

## Local preview

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

then open <http://127.0.0.1:8765/>.
