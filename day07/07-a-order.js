const letters = {};
const order = require('fs').readFileSync('./input', 'utf-8').split('\n')
  .filter(Boolean)
  .map(line => {
    let [,a,b] = /([A-Z]) must.*step ([A-Z])/.exec(line);
    [a,b].forEach(letter => letters[letter] = true);
    return [a,b];
  });

const alphabet = Object.keys(letters).sort().reverse();

const precedence = {};

alphabet.forEach(letter => precedence[letter] = []);

order.forEach(([b,a]) => {
  precedence[b].push(a);
});

Object.values(precedence).forEach(value => value.sort().reverse());

const visited = {};
const sorted = [];
alphabet.forEach(letter => {
  visit(letter);
});

function visit(letter) {
  if (visited[letter]) {
    return;
  }
  visited[letter] = true;
  precedence[letter].forEach((pre) => {
    visit(pre);
  });
  sorted.push(letter);
}

console.log(sorted.reverse().join(''));