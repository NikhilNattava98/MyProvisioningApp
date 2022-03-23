// cucumber.js
let common = [
  "features/*.feature",
  "--require-module ts-node/register", 
  "--require ./src/steps/*.ts", 
  "--require ./src/hooks/hooks.ts",
  "--format json:reports/cucumber-report.json"
].join(' ');

module.exports = {
  default: common
};