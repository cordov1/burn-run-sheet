// Prep-for-tomorrow rules for the burn timecourse run sheet.
// This is the only file to edit for prep. The page reads it on every load.
//
// Each rule says: when TOMORROW has <when>, put <task> on TODAY's prep list.
//   when:  "injury" | "harvest" | "txa" | "bupe" | "am_check" | "pm_check" | "any"
//   per:   "mouse" -> one line per matching mouse      "day" -> one line if there is at least one match
//   task:  text to show. Placeholders are filled in:
//            per mouse: {tag} {tp} {arm} {time}  plus any MOUSE_INFO field, e.g. {lung}
//            per day:   {n} (how many)  {tags} (the IDs, comma-separated)
//   match: optional filter, keep only mice whose field equals the value, e.g. { tp: "6h" }, { arm: "BURN + TXA" }, { lung: "inflation" }
//   time:  optional text for the time column, e.g. "evening" or "before 5 PM"
//   id:    optional stable name, so ticks survive re-ordering of this list
//
// Example rules (remove the // to turn one on):
//   { id: "shave",  when: "injury",  per: "day",   time: "evening", task: "Shave tomorrow's {n} injury mice: {tags}" },
//   { id: "labels", when: "harvest", per: "mouse", task: "Print tube labels for {tag} ({tp}, {arm}, {lung})" },

window.PREP_RULES = [
];

// Per-mouse facts that are not on the Sheet. Usable in match: and as {placeholders}.
window.MOUSE_INFO = {
  // "29562": { lung: "inflation" },
};
