/* 
- first line of input is the order in which numbers are called.
- [x] calls = set of the unique call numbers formatted from input.

- next are chunks of 5 lines each, showing 5*5 grids of numbers, the bingo boards.
  - single digit numbers are read as " 2" (space + 2), not "02"
- [x] board = 5*5 2d array of one board, formatted from one 5-line chunk in input
- [x] boards = array of every board formatted from input.

- for each call in calls, for each board in boards, for each entry in board, if entry == call, it is "marked"

- [x] 1 board wins when 1 column or 1 row has only marked numbers
*/

var fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();

// format input

// - calls are unique, we could use a set if wanted
const calls = (input.split('\n', 1)[0]).split(',');
//console.log(calls);

// - this regular expression matches to a board in the input (https://regexr.com/6asli)
// - IMPORTANT: I added one more line return at the end of the input file! if you don't do this my regex won't process the last board!
const re = /((((\d{2})|( \d))( |\n)){5}){5}/g;
let boards = re[Symbol.match](input);
boards = boards.map(board => {
  let formattedBoard = board.split('\n', 5);
  let rowRe = /\d{1,2}/g;
  formattedBoard = formattedBoard.map(row => rowRe[Symbol.match](row));
  return formattedBoard;
});
//console.log(boards[boards.length-1]);

// mark boards for each call
// try (yay it worked): start with first 5 calls and concat the next one each loop; then for each board go through each row and column; if row/column is a subset of calls, its bingo
// - use array.every

let lastWinningCall;
let callRecord;
let lastWinningBoardIndex = -1;

let boardHasWon = new Array(100).fill(false);

const getLastWinningBoardIndex = function() {
  for (let i = 4; i < calls.length; i++) {
    let currentCalls = calls.slice(0,i+1);
    //console.log(currentCalls);
    for (let j = 0; j < boards.length; j++) {
      // make array of all the rows and cols (aka lines)
      let lines = [...boards[j]];
      // - make and push columns
      for (let k = 0; k < 5; k++) {
        lines.push(boards[j].map(function(val) { return val[k]; }));
      }
      //console.log(lines);
      // check lines
      if (!boardHasWon[j]) {
        console.log("board " + j + " hasnt won yet");
        for (let k = 0; (k < lines.length) && (lastWinningBoardIndex != j); k++) {
          if (lines[k].every(val => currentCalls.includes(val))) {
            
            console.log("bingo on board " + j);
            console.log(boards[j]);
            console.log("line: ");
            console.log(lines[k]);
            console.log("calls: ");
            console.log(currentCalls);
            
            boardHasWon[j] = true;
            callRecord = currentCalls;
            lastWinningCall = currentCalls[currentCalls.length-1];
            // INSTEAD of ending and returning at first bingo, run through everything and update last winning board regularly
            lastWinningBoardIndex = j;
            //console.log(j);
          }
        }
      }
      
    }
  }
  if (lastWinningBoardIndex == -1) {console.log("winner not found.")};
};

console.log("last winning board: " + lastWinningBoardIndex);

// score = sum of unmarked numbers * winning call
// get unmarked numbers
getLastWinningBoardIndex();
const winningBoard = [...boards[lastWinningBoardIndex]];
const flattened = winningBoard.reduce(
  ( previousValue, currentValue ) => previousValue.concat(currentValue),
  []
)
const unmarked = flattened.filter(val => !callRecord.includes(val)).map(x => parseInt(x));
console.log("unmarked: ");
console.log(unmarked);
console.log("last winning call: " + lastWinningCall)

// get score
const unmarkedSum = unmarked.reduce(( previousValue, currentValue ) => previousValue + currentValue, 0);
console.log("sum of unmarked numbers: " + unmarkedSum);
console.log(unmarkedSum * lastWinningCall);