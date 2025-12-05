const inputText = require('./inputText.js');

const grid = inputText.split('\n').map(row => row.split(''));
const M = grid.length;
const N = grid[0].length;
const countAdjacent = (row, col) => {
  if (grid[row][col]!=='@'){
    return Infinity;
  }
  //offset 1 for the center of the 3x3 grid which is a @
  let count = -1;
  for (let r = row - 1; r <= row + 1; r++) {
    if (r < 0 || r >= M) {
      continue;
    }
    for (let c = col - 1; c <= col + 1; c++) {
      if (c < 0 || c >= N) {
        continue;
      }
      if (grid[r][c] === '@') {
        count++;
      }
    }
  }
  return count;
};

const totalRolls = grid
  .reduce((sum, row, r) => sum +
    row
      .map((_, c) => countAdjacent(r, c))
      .filter(n => n < 4)
      .length, 0);
console.log(totalRolls);