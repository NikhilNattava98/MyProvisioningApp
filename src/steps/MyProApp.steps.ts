import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { assert } from "chai";
import { AUTApplication, CustomWorld, LaunchApplication } from "../main.driver";

setDefaultTimeout(750 * 10000);
Given('User Access My Provisioning App on a web browser', async function (this: CustomWorld) {
  try {
    let browserObject = await LaunchApplication()
    this.AUT_Application = new AUTApplication(browserObject);
    await this.AUT_Application?.Mypropage.selectOK();
  } catch (error: any) {
    await this.AUT_Application?.iScreenshot(this);
    return assert.fail(error)
  }
});

Then('User clicks on MyBI and select MyProvisioningCorporate', async function (this: CustomWorld) {
  try {
    await this.AUT_Application?.Mypropage.clickMyBI();
    await this.AUT_Application?.Mypropage.clickMyProvisioningCorporate();
  } catch (error: any) {
    await this.AUT_Application?.iScreenshot(this);
    return assert.fail(error)
  }
})

Then('User clicks on {string}', async function (this: CustomWorld, menu) {
  try {
    await this.AUT_Application?.Mypropage.clickMenuButtons(menu);
  }
  catch (error: any) {
    await this.AUT_Application?.iScreenshot(this)
    return assert.fail(error)
  }
})

Then(/^User click on {string} drop down and selects "(.*)"$/, async function (this: CustomWorld, attribute, option) {
  try {
    await this.AUT_Application?.Mypropage.clickOnYearMonthCountry(attribute, option);
  }
  catch (error: any) {
    await this.AUT_Application?.iScreenshot(this)
    return assert.fail(error)
  }
})

Then(/^User will select Upload WlPCl and uploads the "(.*)"$/, async function (this: CustomWorld, file) {
  try {
    await this.AUT_Application?.Mypropage.AttachDocuments(file);
  } catch (error: any) {
    await this.AUT_Application?.iScreenshot(this)
    return assert.fail(error)
  }
})

Then('click on {string} button.', async function (this: CustomWorld, button) {
  try {
    await this.AUT_Application?.Mypropage.selectingButton(button);
  }
  catch (error: any) {
    await this.AUT_Application?.iScreenshot(this)
    return assert.fail(error)
  }
})

Then('I Close Browser', async function (this: CustomWorld) {
  try {
    await this.AUT_Application?.closeBrowser()
  } catch (error: any) {
    await this.AUT_Application?.iScreenshot(this);
    return assert.fail(error)
  }
});

Then('User selects {string}, {string} and {string} from each dropdown', async function(this:CustomWorld, year, month, country) {
  try {
    await this.AUT_Application?.Mypropage.selectYearMonthCountryValues(year, month, country)
  } catch (error: any) {
    await this.AUT_Application?.iScreenshot(this);
    return assert.fail(error)
  }
})