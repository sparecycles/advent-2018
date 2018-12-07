const polymer = require('fs').readFileSync('./input', 'utf-8').split('\n')
  .filter(Boolean)[0];

function collapse(polymer) {
  const reduced = [];
  for (let i = 0; i < polymer.length; i++) {
    const charCode = polymer.charCodeAt(i);
    if (reduced.length > 0 && 0x20 === (charCode ^ reduced[reduced.length-1])) {
      reduced.pop();
    } else {
      reduced.push(charCode);
    }
  }
  return String.fromCharCode(...reduced);
}

console.log(collapse(polymer).length)
