const fs = require("fs");
const _ = require("lodash");

let tests = true;

function checkModule(type, string) {
  return _.includes(
    fs.readFileSync(`${__dirname}/dist/index.${type}.js`, "utf-8"),
    string
  );
}

console.log("Checking bundle with A type");
tests = tests && !checkModule("A", "MODULE_G");
tests = tests && !checkModule("A", "MODULE_F");

console.log("Checking bundle with B type");
tests = tests && !checkModule("B", "MODULE_E");
tests = tests && !checkModule("B", "MODULE_D");

console.log("Checking bundle with C type");
tests = tests && !checkModule("C", "MODULE_G");
tests = tests && !checkModule("C", "MODULE_F");
tests = tests && !checkModule("C", "MODULE_E");
tests = tests && checkModule("C", "MODULE_H");
tests = tests && checkModule("C", "MODULE_D");

if (!tests) {
  process.exit(1);
}

process.exit(0);
