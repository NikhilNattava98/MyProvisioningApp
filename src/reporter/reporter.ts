var reporter = require('cucumber-html-reporter');

let timestamp: any;
timestamp = (new Date()).getDate() + '_' + (new Date()).getMonth() + "_" + (new Date()).getFullYear() + '_' + (new Date()).getHours() + '_' + (new Date()).getMinutes() + '_' + (new Date()).getSeconds()
var options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/cucumber-report-' + timestamp + '.html',
  reportSuiteAsScenarios: false,
  launchReport: true,
  scenarioTimestamp: true,
  suitetimestamp: true,
  brandTitle: "Report Generated on : " + new Date(),
  metadata: {
    'App Version': '1.0.0',
    'Test Environment': 'INT',
  },
};

reporter.generate(options);
