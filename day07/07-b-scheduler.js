const letters = {};
const order = require('fs').readFileSync('./input', 'utf-8').split('\n')
  .filter(Boolean)
  .map(line => {
    let [,a,b] = /([A-Z]) must.*step ([A-Z])/.exec(line);
    [a,b].forEach(letter => letters[letter] = true);
    return [a, b];
  });

const alphabet = Object.keys(letters).sort();

const precedence = {};

alphabet.forEach(letter => precedence[letter] = []);

order.forEach(([b,a]) => {
  precedence[a].push(b);
});

Object.values(precedence).forEach(value => value.sort().reverse());

function cost(letter) {
  return letter.charCodeAt(0) - 'A'.charCodeAt(0) + 61;
}

function key(started, completed, workers, time) {
  return `${started.split('').sort().join('')}|${completed.split('').sort().join('')}|${workers.map(({letter, step}) => `${letter}${step}`).sort().join('')}|${time}`;
}
const cache = {};
function work(started, completed, workers, time) {
  const workkey = key(started, completed, workers, time);
  const cached = cache[workkey];

  if (cached) {
    return cached;
  }

  while (workers.length > 0 && candidates().length === 0) {
    workers = workers.map(({ letter, step }) => ({
      letter, step: step - 1
    })).filter(({step, letter}) => {
      if (step === 0) {
        completed = completed + letter;
        return false;
      }
      return true;
    });
    time++;
  }

  function candidates() {
    if (workers.length === 5) {
      return [];
    }
    return alphabet
    .filter(letter =>
      started.indexOf(letter) === -1 &&
      precedence[letter].every(pre => completed.indexOf(pre) !== -1));
  }

  const todo = candidates();

  if (todo.length === 0 && workers.length === 0) {
    return cache[workkey] = { started, completed, workers, time };
  }

  const results = todo
    .map(letter => work(started + letter, completed, workers.concat({ letter, step: cost(letter) }), time))
    .filter(Boolean);

  const result = results.sort(({time: t0}, {time: t1}) => t0 - t1)[0];
  return cache[workkey] = result;
}

console.log(work('', '', [], 0).time);