const boxes = require('fs').readFileSync('./input', 'utf-8').split('\n')
  .filter(Boolean);

function counts(box) {
  const counts = Object.create(null);
  box.split('').forEach(letter => counts[letter] = (counts[letter] || 0) + 1);
  return counts;
}

function checksum(boxes) {
  let twos = 0, threes = 0;
  boxes.map(counts).map(counts => {
    let two = 0, three = 0;
    for (let key in counts) {
      if(counts[key] == 2) two = 1;
      if(counts[key] == 3) three = 1;
    }
    twos += two;
    threes += three;
  });
  return twos * threes;
}

console.log(checksum(boxes));