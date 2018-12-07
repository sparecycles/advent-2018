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
const area = {};

function closest(x, y) {
  function distance(point) {
    return Math.abs(points[point].x - x) + Math.abs(points[point].y - y);
  }
  const deltas = points.map((p, i) => [distance(i),i]);
  deltas.sort(([d1], [d2]) => d1 - d2);
  if (deltas[0][0] < deltas[1][0]) {
    return deltas[0][1];
  }
  return null;
}

const counts = {};

for (let x = x0; x < x1; x++)
for (let y = y0; y < y1; y++)
{
  let p = area[`${x}|${y}`] = closest(x,y);
  counts[p] = (counts[p] || 0) + 1;
}

const edge = {};

[x0, x1-1].forEach((x) => {
  for (let y = y0; y < y1; y++) {
    delete counts[area[`${x}|${y}`]];
  }
});

[y0, y1-1].forEach((y) => {
  for (let x = x0; x < x1; x++) {
    delete counts[area[`${x}|${y}`]];
  }
});

const largestArea = Object.entries(counts)
  .filter(([key]) => key != 'null')
  .sort(([,v0], [,v1]) => v1 - v0);

console.log(largestArea);
