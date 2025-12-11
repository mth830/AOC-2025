const inputText = require('./inputText.js');
const lightList = [];
const keyCombinations = [];

const parseInput = () => {
  for (const line of inputText.split('\n')) {
    const [light, ...keys] = line.split(' ');
    const joltage = keys.pop();
    lightList.push(light.slice(1, light.length - 1));
    const parseKey = key => key.slice(1, key.length - 1).split(',').map(Number);
    const keyArray = keys.map(parseKey);
    keyCombinations.push(keyArray)
  }
};

const getStartingState = state => state.replaceAll("#", ".");

const updateState = (lights, keyArray) => {
  let newState = "";
  const keySet = new Set(keyArray);
  for (let i = 0; i < lights.length; i++) {
    let light = lights[i];
    if (keySet.has(i)) {
      light = light === "#" ? "." : "#";
    }
    newState += light;
  }
  return newState;
};

const countMinFlips = (state, index, targetState, cache = {}) => {
  if (state === targetState) {
    return 0;
  }
  if (state in cache) {
    return cache[state];
  }
  cache[state] = Infinity;
  let min = Infinity;
  const switches = keyCombinations[index];
  switches.forEach(lightSwitch => {
    const newState = updateState(state, lightSwitch);
    min = Math.min(1 + countMinFlips(newState, index, targetState, cache), min);
  });
  cache[state] = min;
  return min;
};

parseInput();

const sumMinFlips = lightList.reduce((sum, lights, i) => {
  const startingLights = getStartingState(lights);
  return sum + countMinFlips(startingLights, i, lights);
}, 0);

console.log(sumMinFlips);

