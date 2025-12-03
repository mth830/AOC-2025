const inputText = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;
const STARTING_DIAL_POSITION = 50;

const turnLeft = (x: number, dialPosition: number): number =>
  (dialPosition - x + 100) % 100;

const turnRight = (x: number, dialPosition: number): number =>
  (dialPosition + x + 100) % 100;

const commandList: [string, number][] = inputText
  .split("\n")
  .map(([dir, ...count]) => [dir, Number(count.join(""))]);


function countZeroes(commands: [string, number][]): number {
  let zeroCount: number = 0;
  let dialPosition:number = STARTING_DIAL_POSITION;
  for (const [direction, count] of commands) {
    if (direction === "R") {
      dialPosition=turnRight(count,dialPosition);
    } else {
      dialPosition=turnLeft(count,dialPosition);
    }
    if (dialPosition === 0) {
      zeroCount++;
    }
  }
  return zeroCount;
}
console.log(countZeroes(commandList));
