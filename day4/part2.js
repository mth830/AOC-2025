const inputText = require('./inputText.js');

const grid = inputText.split('\n').map(row => row.split(''));
const M = grid.length;
const N = grid[0].length;
const countAdjacent = (row, col) => {
  if (grid[row][col] !== '@') {
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

const removePaperTowels = (r, c) => {
  let count = 0;
  if (countAdjacent(r, c) < 4) {
    grid[r][c] = '.';
    count++;
  }
  return count;

};

let totalRemoved = 0;
let newRemoved = 0;
do {
  newRemoved = 0;
  for (let r = 0; r < M; r++) {
    for (let c = 0; c < N; c++) {
      newRemoved += removePaperTowels(r, c);

    }
  }
  totalRemoved += newRemoved;

} while (newRemoved > 0)
console.log(totalRemoved);
