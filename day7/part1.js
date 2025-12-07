const inputText = require('./inputText');
const grid = inputText.split('\n').map(row => row.split(''));

const countSplits = (grid) => {
  let count = 0;
  for (let r = 1; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      const above = grid[r - 1][c];
      const topRight = c < grid.length - 1 ? grid[r - 1][c + 1] : null;
      const topLeft = c > 0 ? grid[r - 1][c - 1] : null;
      if (grid[r][c] === '^') {
        grid[r][c] = 'X';
        if (above === '|') {
          count += 1;
        }
      } else if (above === 'S' || above === '|') {
        grid[r][c] = '|';
      } else if (topLeft === 'X' || topRight === 'X' && grid[r][c] !== '|') {
        grid[r][c] = '|';
      }
    }
  }
  return count;
};

const drawMap = grid => grid.map(row => row.join('')).join('\n');

console.log(countSplits(grid));
