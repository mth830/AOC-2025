const inputText = require('./inputText');
const grid = inputText.split('\n').map(row => row.split(''));
const STARTING_ROW = 0;
const STARTING_COL = grid[0].findIndex(x => x === 'S');

const countPaths = (grid, r = 0, c = 0, memo = {}) => {
  if (r === grid.length) {
    return 1;
  }
  if ([r, c] in memo) {
    return memo[[r, c]];
  }
  let paths = 0;
  const curr = grid[r][c];
  let count = 0;
  if (curr === 'S' || curr === '.') {
    count += countPaths(grid, r + 1, c, memo);
  } else if (curr === '^') {
    count += countPaths(grid, r, c - 1, memo) + countPaths(grid, r, c + 1, memo);
  }
  memo[[r, c]] = count;
  return count;
};

const drawMap = grid => grid.map(row => row.join('')).join('\n');

console.log(countPaths(grid, STARTING_ROW, STARTING_COL));
