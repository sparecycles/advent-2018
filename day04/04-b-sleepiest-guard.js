const shiftslog = require('fs').readFileSync('./input', 'utf-8').split('\n')
  .filter(Boolean)
  .sort()
  .map(s => /^\[(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2})\]\s(.*)$/.exec(s))
  .filter(Boolean)
  .map(match => {
    const [, ...values] = match;
    const [year, month, day, hour, minute] = values.slice(0, -1).map(Number);
    const text = values.slice(-1);
    const guardmatch = /Guard #(\d+) begins shift/.exec(text);
    let info = guardmatch ? {
      type: 'begin', guard: Number(guardmatch[1])
    } : {
      type: /falls asleep/.test(text) ? 'sleep' : 'wake'
    };
    return { date: { year, month, day, hour, minute }, ...info };
  });

const guards = shiftslog.reduce((state, logentry) => {
  switch (logentry.type) {
    case 'begin':
      state.current_guard = logentry.guard;
      break;
    case 'sleep':
      state.sleeping = logentry.date;
      break;
    case 'wake':
      const guard = state.guards[state.current_guard] = state.guards[state.current_guard] || {
        id: state.current_guard,
        sleeplog: []
      };
      guard.sleeplog.push([state.sleeping, logentry.date]);
      break;
  }
  return state;
}, { guards: {}, current_guard: null, sleeping: null }).guards;

Object.values(guards).forEach(guard => {
  guard.total_sleep = guard.sleeplog.reduce((a, [s,e]) => {
    return a + e.minute - s.minute;
  }, 0);
});

function sleepiest_minute(guard) {
  const timeline = [];
  guard.sleeplog.forEach(([{ minute: start_minute }, { minute: end_minute }]) => {
    for (let m = start_minute; m < end_minute; m++) {
      timeline[m] = (timeline[m] || 0) + 1
    }
  });
  const [count, minute] = timeline.map((v, i) => [v,i]).sort(([v1], [v2]) => v2 - v1)[0];
  return { guard: guard.id, count, minute };
}

const { guard, minute } = Object.values(guards).map(sleepiest_minute).sort(({count: c1}, {count: c2}) => {
  return c2 - c1;
})[0];

console.log(guard*minute);
