import { AfterStep } from '@cucumber/cucumber';
import { CustomWorld } from '../main.driver';
const assert1 = require('soft-assert');
var { After, Before } = require('@cucumber/cucumber');

Before(async function (testCase: any) {
  // @ts-ignore
  this.AUT_Application = globalThis.globalDriver;
  let featurearray = testCase.pickle.uri.split("\\");
  let featurename = (featurearray[1].replace(".feature", "")).trim();
  process.env.CurrentFeatureName = featurename;
  console.log("Scenario:", testCase.pickle.name, ":Started");
});

After(async function (this: CustomWorld, testCase: { pickle: { name: string; }; result: { status: string; }; }) {
  // @ts-ignore
  globalThis.globalDriver = this.AUT_Application;
  console.log("Scenario:", testCase.pickle.name, ":", testCase.result.status)
  assert1.softAssertAll();
});

AfterStep(async function (this: CustomWorld) {
  await this.AUT_Application?.iScreenshot(this);
})