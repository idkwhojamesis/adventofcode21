var fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();
let matrix = [];

let prev = -1;
// make matrix
for (let i = 12; i <= input.length; i += 13) {
  matrix.push(input.slice(prev+1,i));
  prev = i;
}

let ones = new Array(12).fill(0);
let gamma = '';
let epsilon = '';
// gather # of ones per space
for (const entry of matrix) {
  for (let i = 0; i < 12; i++) {
    ones[i] += parseInt(entry[i]);
  }
}
// make gamma
for (const n of ones) {
  // if ones are most common in space
  if (n > matrix.length / 2) {
    console.log(1);
    gamma = gamma.concat('1');
    epsilon = epsilon.concat('0');
  }
  else {
    console.log(2);
    gamma = gamma.concat('0');
    epsilon = epsilon.concat('1');
  }
}
gamma = parseInt(gamma, 2);
epsilon = parseInt(epsilon, 2);

console.log (gamma + " * " + epsilon + " = " + (gamma * epsilon));

