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

function removeUnit(polymer, codePoint) {
  const regex = new RegExp(String.fromCodePoint(codePoint), 'ig');
  return polymer.replace(regex, '');
}

let A = 'A'.charCodeAt(0);
let Z = 'Z'.charCodeAt(0);
let options = [];
for (let remove = A; remove <= Z; remove++) {
  options.push(collapse(removeUnit(polymer, remove)));
}

options.sort((a, b) => a.length - b.length);

console.log(options[0].length)
