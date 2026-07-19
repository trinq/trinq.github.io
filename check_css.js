const fs = require('fs');
const css = fs.readFileSync('assets/css/reading.css', 'utf8');

let depth = 0;
let lines = css.split('\n');
for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  for (let j = 0; j < line.length; j++) {
    if (line[j] === '{') depth++;
    if (line[j] === '}') depth--;
  }
}

console.log('Final brace depth:', depth);
if (depth !== 0) {
  console.log('Unclosed braces found!');
  
  // Find where it went wrong
  depth = 0;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    for (let j = 0; j < line.length; j++) {
      if (line[j] === '{') depth++;
      if (line[j] === '}') depth--;
    }
    if (depth > 1) { // most CSS in this file shouldn't have nesting > 1, except media queries
      console.log(`Deep nesting at line ${i+1}: ${line} (depth ${depth})`);
    }
  }
}
