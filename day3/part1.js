const inputText = require('./inputText.js');

const batteryBanks = inputText.split('\n').map(id => id.split('').map(Number));

const calculateMaxJoltage = (banks) => banks.reduce((sum, bank) => sum + calculateBankMax(bank), 0);

const calculateBankMax = bank => {
  const maxAfter = new Array(bank.length).fill(-1);
  let max = -1;
  let bankMax = -Infinity;
  for (let i = bank.length - 1; i >= 0; i--) {
    maxAfter[i] = max;
    max = Math.max(bank[i], max);
  }
  for (let i = 0; i < bank.length - 1; i++) {
    const left = bank[i];
    const right = maxAfter[i];
    const sum = 10 * bank[i] + right;
    bankMax = Math.max(bankMax, sum);
  }
  return bankMax;
};
console.log(calculateMaxJoltage(batteryBanks));