const inputText = require('./inputText.js');
const ingredients = [];
const ranges = [];

for (const line of inputText.split('\n')) {
  if (line.includes('-')) {
    const [start, end] = line.split('-');
    ranges.push([Number(start), Number(end)]);
  } else {
    ingredients.push(Number(line))
  }
}

const usedIngredients = new Set();
let freshIngredients = 0;

const insideRange = (start, end, item) => {
  return item >= start && item <= end;
};

const isFresh = (ingredient)=>{
  return ranges.some(([start, end]) => insideRange(start, end, ingredient))
};

for (const ingredient of ingredients) {
  if (!usedIngredients.has(ingredient)) {
    usedIngredients.add(ingredient);
    if (isFresh(ingredient)) {
      freshIngredients += 1;
    }
  }
}

console.log(freshIngredients);
