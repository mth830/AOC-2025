const inputText = require('./inputText.js');

const idList = inputText.split(',').map(id => id.split('-').map(Number));

const isValidID = num => {
  const numString = num.toString();
  for (let size = 1; size <= numString.length / 2; size++) {
    if (!Number.isInteger(numString.length / size)) {
      continue;
    }
    const splitNumbers = []
    for (let j = 0; j < numString.length; j += size) {
      splitNumbers.push(numString.slice(j, j + size));
    }
    if(splitNumbers.every(pattern=>pattern===splitNumbers[0])){
      return false;
    }
  }
  return true;
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