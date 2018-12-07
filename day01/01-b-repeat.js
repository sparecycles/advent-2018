const frequencies = require('fs').readFileSync('./input', 'utf-8').split('\n')
  .map(s => s.trim())
  .filter(Boolean)
  .map(Number);

const repeats = Object.create(null);
let current = 0;
for (;;) {
  frequencies.forEach((f) => {
    current += f;
    if (repeats[current]) {
      console.log(current);
      process.exit(0);
    }
    repeats[current] = true;
  });
}
