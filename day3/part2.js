const inputText = require('./inputText.js');

const BATTERY_COUNT = 12;
const batteryBanks = inputText.split('\n').map(id => id.split('').map(Number));

const calculateMaxJoltage = (banks) => banks
  .reduce((sum, bank) => sum + calculateBankMax(bank), 0);

const calculateBankMax = bank => {
  let stack = [];
  for (let i = 0; i < bank.length; i++) {
    const curr = bank[i];
    while (stack.length
      && stack.at(-1) < curr
      && stack.length + bank.length - i - 1 >= BATTERY_COUNT) {
      stack.pop();
    }
    stack.push(curr);
  }
  const largestString = stack.slice(0, BATTERY_COUNT).join('');
  const largest = Number(largestString);
  return largest;
};
console.log(calculateMaxJoltage(batteryBanks));