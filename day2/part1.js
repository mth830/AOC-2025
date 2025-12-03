const inputText = require('./inputText.js');

const idList = inputText.split(',').map(id => id.split('-').map(Number));

const isValidID = num => {
  const numString = num.toString();

  if (numString.length % 2 !== 0) {
    return true;
  }

  const firstHalf = numString.slice(0, numString.length / 2);
  const secondHalf = numString.slice(numString.length / 2);
  return firstHalf !== secondHalf;
};
const sumInvalidID = idList => {
  return idList.reduce((sum, [first, second]) => {
    let count = 0;
    for (let i = first; i <= second; i++) {
      if (!isValidID(i)) {
        count += i;
      }
    }
    return sum + count;
  }, 0);
};
console.log(sumInvalidID(idList));