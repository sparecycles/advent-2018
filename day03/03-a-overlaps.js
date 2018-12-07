const input = require('fs').readFileSync('./input', 'utf-8').split('\n')
  .filter(Boolean);

const claims = input.map(claim => /^#(\d+)\s*@\s*(\d+),(\d+):\s*(\d+)x(\d+)/.exec(claim)).filter(Boolean).map(match => {
  const [, ...values] = match;
  const [id, x, y, w, h] = values.map(Number);
  return {
    id, x, y, w, h
  };
});

const fabric = Object.create(null);

claims.forEach(({x,y,w,h}) => {
  for(let i = x; i < x+w; i++) {
    for(let j = y; j < y+h; j++) {
      const k = `${i}|${j}`;
      fabric[k] = (fabric[k] || 0) + 1;
    }
  }
});

console.log(Object.values(fabric).filter(v => v >= 2).length);