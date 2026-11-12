// Prep-for-tomorrow rules. Edit this file and push; the Tomorrow tile follows it.
//
// Each rule looks at what the Calendar lists for TOMORROW and adds a line to today's Tomorrow tile.
//   when:  which list tomorrow is read from: "injury" | "harvest" | "txa" | "bupe" | "am_check" | "pm_check" | "any"
//   match: only keep items whose fields equal these values. Injury items have tag, tp, arm, time, txa ("yes"/"no"), burn ("yes"/"no").
//          Harvest items have tag, tp, arm, time, txa, sameDay. Mouse-level extras can be added in MOUSE_INFO below.
//   per:   "day"   = one line for the whole group (placeholders {n} = how many, {tags} = the mouse IDs)
//          "mouse" = one line per mouse (placeholders {tag} {tp} {arm} {time} + any MOUSE_INFO fields)
//   label: the bold text of the line;  task: the muted text after it;  ids: true lists the mouse IDs under a "day" line
//   time:  short text shown in the time column ("today", "tonight", "4:00 PM" ...)
//   id:    a stable name for the tick (keep it unchanged once people are ticking)

window.PREP_RULES = [
  { id: 'shave', when: 'injury', match: { burn: 'yes' }, per: 'day', time: 'today',
    label: 'Shave · {n} mice', task: 'burned tomorrow', ids: true },
  { id: 'waterbath', when: 'injury', match: { burn: 'yes' }, per: 'day', time: 'tonight',
    label: 'Water bath', task: 'turn on tonight · {n} burns tomorrow' },
];

// Extra per-mouse facts the rules can match on or print, e.g. { "29562": { lung: "inflation" } }.
window.MOUSE_INFO = {
};
