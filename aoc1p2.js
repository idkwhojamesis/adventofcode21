var fs = require('fs');
const report = fs.readFileSync('./input.txt').toString();
let result = 0;
let num1 = 125;
let num2 = 127;
let num3 = '';
let win1 = 376;
let win2 = 0;
[...report].forEach(function(c, i){
  if (i >= 12) {
    if (c != '\n'){
      num3 = num3.concat(c);
    }
    else {
      num3 = parseInt(num3);
      console.log("n3 " + num3)
      win2 = num1 + num2 + num3;
      if (win2 > win1) {
        result++;
      }
      num1 = num2;
      num2 = num3;
      num3 = '';
      win1 = win2;
    }
  }
})


console.log(result);