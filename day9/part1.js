const inputText = require('./inputText.js');
const coordinates = inputText.split('\n').map(row => row.split(',').map(Number));

const computeArea = (x1, y1, x2, y2) => (1 + Math.abs(x1 - x2)) * (Math.abs(y1 - y2) + 1);

const getAreas = () => {
  let max = 0;
  for (let i = 0; i < coordinates.length; i++) {
    const [x1, y1] = coordinates[i];
    for (let j = i + 1; j < coordinates.length; j++) {
      const [x2, y2] = coordinates[j];
      const area = computeArea(x1, y1, x2, y2);
      max = Math.max(area, max);
    }
  }
  return max;
}
console.log(getAreas());