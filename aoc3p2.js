var fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();
let matrix = [];

let prev = -1;
// make matrix
for (let i = 12; i <= input.length; i += 13) {
  matrix.push(input.slice(prev+1,i));
  prev = i;
}

function filterMatrix(rating) {
  // rating: true for filtering for oxygen values, false for co2 values
  let filteredMatrix = [...matrix];
  for (let i = 0; filteredMatrix.length > 1; i++) {
    // calculate # of ones
    // use mod 12 for index
    let ones = 0;
    for (const entry of filteredMatrix) {
      if (entry[i%12] == 1) {
        ones++;
      }
    }
    // filter matrix for either most or least common value
    const most = ones >= (filteredMatrix.length / 2) ? 1 : 0;
    filteredMatrix = filteredMatrix.filter(entry => entry[i%12] == (rating == true ? most : !most));
    console.log("i = " + i % 12 + " most = " + most + " mode: " + (rating ? "most" : "least"));
    console.log(filteredMatrix);
  }
  return filteredMatrix[0];
}

const oxygenValue = parseInt(filterMatrix(true), 2);
const coValue = parseInt(filterMatrix(false), 2); 
console.log(oxygenValue);
console.log(coValue);
console.log(oxygenValue * coValue);





