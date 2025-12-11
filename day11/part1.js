const inputText = require('./inputText.js');
const formattedInput = inputText.replaceAll(": ", " ");
const rows = formattedInput.split('\n').map(row => row.split(' '));
const adjList = {};

rows.forEach(([from, ...toList]) => {
  adjList[from] = toList;
});

const countPaths = (node = 'you', cache = {}, adjList) => {
  if (node === 'out') {
    return 1;
  }
  if (node in cache) {
    return cache[node];
  }
  cache[node] = 0;
  let total = 0;
  const nextList = adjList[node];
  nextList.forEach(child => {
    total += countPaths(child, cache, adjList);
  });
  cache[node] = total;
  return total;
}
console.log(countPaths('you', {}, adjList));