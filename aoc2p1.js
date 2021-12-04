var fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();
let depth = 0;
let length = 0;

let word = '';
let num;
[...input].forEach(function(c, i){
  c = c.toString();
  //console.log(word);
  // if letter
  if ((/[a-zA-Z]/).test(c)) {
    word = word.concat(c);
    console.log("char " + c);
  }
  // this only works if the number is digit
  else if (Number.isInteger(parseInt(c))) {
    num = parseInt(c);
    console.log(num);
    switch (word) {
      case 'forward':
        length += num;
        break;
      case 'up':
        depth -= num;
        break;
      case 'down':
        depth += num;
        break;
      default:
        console.log("couldnt process word");
    }
    word = '';
    console.log("EOL " + "l: " + length + " d: " + depth);
  }
  else if (c == ' ') {
    console.log("space");
  }
  else if (c == '\n') {
    console.log("eol");
  }
  else {
    console.log ("not processing input");
  }
})


console.log("l: " + length + " d: " + depth);
console.log(length * depth);