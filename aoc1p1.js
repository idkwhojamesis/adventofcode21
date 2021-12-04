var fs = require('fs');
const report = fs.readFileSync('./input.txt').toString();

let result = 0;
//console.log(report.charAt(0));
let num1 = parseInt(report.slice(0, 3));
let num2 = '';
for (let c of report){
  if (c != '\n'){
    num2 = num2.concat(c);
  }
  else {
    num2 = parseInt(num2);
    if (num2 > num1) {
      result++;
    }
    num1 = num2;
    num2 = '';
  }
}


console.log(result);