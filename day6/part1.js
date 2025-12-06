const inputText = require('./inputText.js');
const grid = inputText
  .split('\n')
  .map(row => row.split(' ').filter(x => x).map(x => isNaN(x) ? x : Number(x)));

const transpose = grid => {
  const M = grid.length;
  const N = grid[0].length;
  const newGrid = new Array(N).fill().map(row => new Array(M).fill());
  for (let r = 0; r < newGrid.length; r++) {
    for (let c = 0; c < newGrid[0].length; c++) {
      newGrid[r][c] = grid[c][r];
    }
  }
  return newGrid;
};

const transposedGrid = transpose(grid);
const sumRows = transposedGrid.filter(row => row.at(-1) === '+');
const productRows = transposedGrid.filter(row => row.at(-1) === '*');
const sum = (acc, x) => acc + x;
const product = (acc, x) => acc * x;
const sumOfRows = (acc, row) => acc + row.slice(0, row.length - 1).reduce(sum, 0);
const sumOfProductOfRows = (acc, row) => acc + row.slice(0, row.length - 1).reduce(product, 1);
const totalSums = sumRows.reduce(sumOfRows, 0);
const totalProducts = productRows.reduce(sumOfProductOfRows, 0);

const total = totalProducts + totalSums;

console.log(total);
