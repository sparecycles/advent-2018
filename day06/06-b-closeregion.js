const points = require('fs').readFileSync('./input', 'utf-8').split('\n')
  .map(s => /^(\d+),\s*(\d+)/.exec(s))
  .filter(Boolean)
  .map(match => {
    const [, ...values] = match;
    const [x, y] = values.map(Number);
    return { x, y };
  });

const { xmin, xmax, ymin, ymax } = points.reduce(({ xmin, xmax, ymin, ymax }, { x, y }) => ({
  xmin: Math.min(x, xmin),
  xmax: Math.max(x, xmax),
  ymin: Math.min(y, ymin),
  ymax: Math.max(y, ymax)
}), {
  xmin: points[0].x, xmax: points[0].x,
  ymin: points[0].y, ymax: points[0].y
});

const boundswidth = xmax - xmin;
const boundsheight = ymax - ymin;

const x0 = xmin - boundswidth;
const x1 = xmax + boundswidth;
const y0 = ymin - boundsheight;
const y1 = ymax + boundsheight;

function distance(x,y) {
  function pdistance(point) {
    return Math.abs(point.x - x) + Math.abs(point.y - y);
  }
  return points.reduce((total, point) => total + pdistance(point), 0);
}

let size = 0;
for(let x = x0; x < x1; x++)
for(let y = y0; y < y1; y++) {
  if (distance(x,y) < 10000) {
    size++;
  }
}

console.log(size);