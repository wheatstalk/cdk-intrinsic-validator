const fs = require('fs');

const scriptArgs = process.argv.slice(2);
if (scriptArgs.length === 0) {
  throw new Error('Usage: lit-snip.js <lit-file.ts>');
}

const litFile = scriptArgs[0];
const litFileContents = fs.readFileSync(litFile).toString();

const lines = litFileContents.split(/\r?\n/i);

let snipping = false;
let indent = 0;

lines.forEach(line => {
  if (/::SNIP/.test(line)) {
    snipping = true;
    indent = line.indexOf('//');
    console.log('```ts');
  } else if (/::END-SNIP/.test(line)) {
    snipping = false;
    console.log('```');
  } else if (snipping) {
    const message = line.slice(indent);
    console.log(message);
  }
})