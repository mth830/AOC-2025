const inputText = require('./inputText2.js');
const formattedInput = inputText.replaceAll(": ", " ");
const rows = formattedInput.split('\n').map(row => row.split(' '));
const adjList = {};

rows.forEach(([from, ...toList]) => {
  adjList[from] = toList;
});

const countPaths = (node = 'svr', dac = false, fft = false, cache = {}, adjList) => {
  if (node === 'out') {
    if (dac && fft) {
      return 1;
    }
    return 0;
  }
  const key = [node,dac,fft];
  if (key in cache) {
    return cache[key];
  }
  if(node==='dac'){
    dac=true;
  }
  if(node==='fft'){
    fft=true;
  }
  cache[key] = 0;
  let total = 0;
  const nextList = adjList[node];
  nextList.forEach(child => {
    total += countPaths(child,dac,fft, cache, adjList);
  });
  cache[key] = total;
  return total;
}
console.log(countPaths('svr',false,false, {}, adjList));