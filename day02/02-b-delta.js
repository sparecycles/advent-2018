const boxes = require('fs').readFileSync('./input', 'utf-8').split('\n')
  .filter(Boolean);

function delta(box1, box2) {
  return box1.split('').map((c, i) => box2[i] !== c).reduce((acc, b) => acc + (b ? 1 : 0), 0);
}

function common(box1, box2) {
  return box1.split('').filter((c, i) => box2[i] === c).join('');
}

for (let i = 0; i < boxes.length; i++) {
  for (let j = i+1; j < boxes.length; j++) {
    if (delta(boxes[i], boxes[j]) === 1) {
      console.log(common(boxes[i], boxes[j]));
    }
  }
}