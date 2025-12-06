const inputText = require('./inputText.js');
const grid = inputText
  .split('\n')
  .map(row => row.split(''));


const reorder = grid => {
  const newGrid = [];
  const maxCols = Math.max(...grid.map(row => row.length));

  for (let c = 0; c < maxCols; c++) {
    let newRow = [];
    for (let r = 0; r < grid.length; r++) {
      newRow.push(grid[r][c]);
    }

    newGrid.push(newRow.join(''));
  }
  return newGrid;
};


const reorderGrid2 = grid => {
  const newGrid = [];
  let i = 0;
  let operation = null;
  let row = [];
  grid.push("  ");
  for (const elem of grid) {
    if (i === 0) {
      operation = elem.at(-1);
      const num = Number(elem.slice(0, elem.length - 1));
      i++;
      row.push(num);
    }
    else if (elem.split('').every(x => x === " ")) {
      i = 0;
      row.push(operation);
      newGrid.push(row);
      row = [];
    } else {
      row.push(Number(elem));
    }
  }

  return newGrid;
}
const reordered = reorderGrid2(reorder(grid));

const sumRows = reordered.filter(row => row.at(-1) === '+');
const productRows = reordered.filter(row => row.at(-1) === '*');
const sum = (acc, x) => acc + x;
const product = (acc, x) => acc * x;
const sumOfRows = (acc, row) => acc + row.slice(0, row.length - 1).reduce(sum, 0);
const sumOfProductOfRows = (acc, row) => acc + row.slice(0, row.length - 1).reduce(product, 1);
const totalSums = sumRows.reduce(sumOfRows, 0);
const totalProducts = productRows.reduce(sumOfProductOfRows, 0);

const total = totalProducts + totalSums;

console.log(total);
