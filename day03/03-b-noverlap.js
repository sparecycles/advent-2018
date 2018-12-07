const input = require('fs').readFileSync('./input', 'utf-8').split('\n')
  .filter(Boolean);

const claims = input.map(claim => /^#(\d+)\s*@\s*(\d+),(\d+):\s*(\d+)x(\d+)/.exec(claim)).filter(Boolean).map(match => {
  const [, ...values] = match;
  const [id, x, y, w, h] = values.map(Number);
  return {
    id, x, y, w, h
  };
});

const unclaimed = Object.create(null);
const fabric = Object.create(null);

claims.forEach(({id,x,y,w,h}) => {
  unclaimed[id] = true;
  for(let i = x; i < x+w; i++) {
    for(let j = y; j < y+h; j++) {
      const k = `${i}|${j}`;
      const used = fabric[k];
      if (used) {
        delete unclaimed[used];
        delete unclaimed[id];
      }
      fabric[k] = id;
    }
  }
});

console.log(Object.keys(unclaimed).join(','));