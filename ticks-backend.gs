/**
 * Burn Timecourse Run Sheet - shared ticks backend (Google Apps Script).
 *
 * Keeps the team's ticks in its OWN spreadsheet, so the calendar Sheet is never written to.
 *
 * One-time set-up (about 3 minutes, on the Google account that will own the ticks):
 *   1. Create a new blank Google Sheet, name it "Burn Run-Sheet Ticks".
 *   2. Extensions > Apps Script. Delete the sample code, paste this whole file, save.
 *   3. Deploy > New deployment > type: Web app. Execute as: Me. Who has access: Anyone. Deploy.
 *      Authorize when asked. The script only touches the spreadsheet it is attached to.
 *   4. Copy the Web app URL (ends in /exec) into TICKS_URL near the top of index.html.
 *
 * API (all GET, JSON back; keys are whatever the page sends, e.g. "txa|29590|3 hr"):
 *   ?action=get&date=11/12                                   -> { date, ticks: { "<key>": { by, at } } }
 *   ?action=set&date=11/12&key=<key>&done=1&by=BA            -> same shape, after writing
 *   ?action=set&date=11/12&key=<key>&done=0                  -> same shape, after removing the tick
 */
var SHEET_NAME = 'Ticks';

function doGet(e) {
  var p = (e && e.parameter) || {};
  var date = String(p.date || '').trim();
  if (!date) return json_({ error: 'date required' });
  if (p.action === 'set') {
    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      write_(date, String(p.key || ''), p.done === '1' || p.done === 'true', String(p.by || '').toUpperCase().slice(0, 8));
    } finally {
      lock.releaseLock();
    }
  }
  return json_({ date: date, ticks: read_(date) });
}

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.getRange('A:D').setNumberFormat('@');  // plain text, so "11/12" is never turned into a date
    sh.appendRow(['date', 'key', 'by', 'at']);
  }
  return sh;
}

function read_(date) {
  var rows = sheet_().getDataRange().getValues();
  var out = {};
  for (var i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === date) out[String(rows[i][1])] = { by: String(rows[i][2] || ''), at: String(rows[i][3] || '') };
  }
  return out;
}

function write_(date, key, done, by) {
  if (!key) return;
  var sh = sheet_();
  var rows = sh.getDataRange().getValues();
  for (var i = rows.length - 1; i >= 1; i--) {
    if (String(rows[i][0]) === date && String(rows[i][1]) === key) sh.deleteRow(i + 1);
  }
  if (done) sh.appendRow([date, key, by, Utilities.formatDate(new Date(), 'America/Chicago', 'h:mm a')]);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
