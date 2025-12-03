const inputText = require('./inputText.js');
const STARTING_DIAL_POSITION = 50;

const pyMod = (a, b) => ((a % b) + b) % b;

const turnLeftAndCountZeroes = (x, dialPosition) => {
  let zeroCount = 0;
  let remaining = 0;
  if (dialPosition === 0) {
    zeroCount--;
  }
  if (dialPosition - x <= 0) {
    zeroCount++;
    remaining = Math.floor((x - dialPosition) / 100);
  }
  zeroCount += remaining;

  return [pyMod(dialPosition - x, 100), zeroCount];
};
const turnRightAndCountZeroes = (x, dialPosition) => {
  let zeroCount = 0;
  let remaining = 0;

  if (dialPosition + x >= 100) {
    zeroCount++;
    const distance = 100 - dialPosition;
    remaining = Math.floor((x - distance) / 100);
  }
  zeroCount += remaining;
  return [pyMod(dialPosition + x, 100), zeroCount];
};

const commandList = inputText
  .split("\n")
  .map(([dir, ...count]) => [dir, Number(count.join(""))]);

function countZeroes(commands) {
  let zeroCount = 0;
  let dialPosition = STARTING_DIAL_POSITION;
  let extraZeroes = 0;
  for (const [direction, turnCount] of commands) {
    if (direction === "R") {
      [dialPosition, extraZeroes] = turnRightAndCountZeroes(turnCount, dialPosition);
    } else {
      [dialPosition, extraZeroes] = turnLeftAndCountZeroes(turnCount, dialPosition);
    }
    zeroCount += extraZeroes
  }
  return zeroCount;
}
console.log(countZeroes(commandList));

