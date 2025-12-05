const inputText = require('./inputText.js');
const ranges = [];

for (const line of inputText.split('\n')) {
  if (line.includes('-')) {
    const [start, end] = line.split('-');
    ranges.push([start, end]);
  }
}

ranges.sort(([start1, end1], [start2, end2]) =>
  start1 === start2 ? end1 - end2 : start1 - start2
);

const stack = [];
for (let i = 0; i < ranges.length; i++) {
  let [start, end] = ranges[i];

  while (stack.length && stack.at(-1)[1] >= start) {
    const [prevStart, prevEnd] = stack.pop();
    start = Math.min(start, prevStart);
    end   = Math.max(end, prevEnd);
  }

  stack.push([start, end]);
}

const mergedRanges = stack;
const totalFresh = (start, end) => end - start + 1;

const freshIngredients = mergedRanges.reduce((sum, [start, end]) => sum + BigInt(totalFresh(start, end)), 0n);



console.log(freshIngredients);
