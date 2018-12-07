const frequencies = require('fs').readFileSync('./input', 'utf-8').split('\n')
  .map(s => s.trim())
  .filter(Boolean)
  .map(Number);

console.log(frequencies.reduce((a,b) => a + b, 0));
