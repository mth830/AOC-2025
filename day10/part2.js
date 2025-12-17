import inputText from './inputText.js';
import {solve} from './part2gplkhelper.js';
const lightList = [];
const keyCombinations = [];
const joltageList = [];

const parseInput = () => {
  for (const line of inputText.split('\n')) {
    const [light, ...keys] = line.split(' ');
    const joltage = keys.pop();
    const joltageArray = joltage.slice(1, joltage.length - 1).split(',').map(Number);
    joltageList.push(joltageArray);
    lightList.push(light.slice(1, light.length - 1));
    const parseKey = key => key.slice(1, key.length - 1).split(',').map(Number);
    const keyArray = keys.map(parseKey);
    keyCombinations.push(keyArray)
  }
};

parseInput();


const sumMinFlips = joltageList
  .reduce((sum, requirement, i) => {
    return sum + solve(requirement, keyCombinations[i]);
  }, 0);
console.log(sumMinFlips);



