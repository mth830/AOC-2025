const inputText = require('./inputText.js');

const pointList = inputText.split('\n').map(row => row.split(',').map(x => Number(x)));
const distance = ([x1, y1, z1], [x2, y2, z2]) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);

const parents = pointList.map((x, i) => i);
const counts = parents.map(x => 1);

const getDistancePairs = () => {
  const distancePairs = [];
  for (let i = 0; i < pointList.length; i++) {
    for (let j = i + 1; j < pointList.length; j++) {
      distancePairs.push([i, j]);
    }
  }
  return distancePairs;
};

const find = x => {
  if (parents[x] === x) {
    return x;
  }
  parents[x] = find(parents[x]);
  return parents[x];
};

const union = (x, y) => {
  const parentX = find(x);
  const parentY = find(y);
  if (parentX !== parentY) {
    if (counts[parentX] >= counts[parentY]) {
      counts[parentX] += counts[parentY];
      counts[parentY] = 0;
      parents[parentY] = parentX;
    } else {
      counts[parentY] += counts[parentX];
      counts[parentX] = 0;
      parents[parentX] = parentY;
    }
  }
};

const mergeNJunctions = (n, distancePairs) => {
  let i = 0;
  let count = 0;
  while (i < n) {
    const [a, b] = distancePairs[i];
    if (find(a) !== find(b)) {
      union(a, b);
      count += 1;
    }
    i++;
  }
};

const getLargestCounts = n => {
  counts.sort((a, b) => b - a);
  return counts.slice(0, n);
};

const distancePairs = getDistancePairs();

distancePairs.sort((a, b) => {
  const [i1, j1] = a;
  const [i2, j2] = b;
  const distance1 = distance(pointList[i1], pointList[j1]);
  const distance2 = distance(pointList[i2], pointList[j2]);
  return distance1 - distance2;
});

const maxIterations = 10;
mergeNJunctions(maxIterations, distancePairs);
const product = getLargestCounts(3).reduce((prod, x) => prod * x, 1);

console.log(product);
