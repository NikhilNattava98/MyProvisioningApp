import { assert } from 'chai';
import * as Testdata from "../../../testdata/testdata.json";
import * as path from 'path';
import { Page } from 'playwright';
import HelperMethods from '../../helpers/HelperMethods';
import * as MyproSelectors from './Mypro.selector.json';
import { AUTApplication, CustomWorld, LaunchApplication } from '../../main.driver';
const envFile = path.join(process.cwd(), 'testdata/.env');
require('dotenv').config({ path: envFile });


export class MyPropage extends HelperMethods {
  AUT_Application: AUTApplication;

  constructor(page: Page) {
    super(page);
  }

  // This method is used to select the OK button at the beginning of My Provisioning App

  async selectOK() {
    await this.iClick(MyproSelectors.OKbutton)
  }

  // This method is used to select MyBI Homescreen

  async clickMyBI() {
    await this.iClick(MyproSelectors.MyBi);
  }

  // This method is used to select Provisioning corporate option in MyBI

  async clickMyProvisioningCorporate() {
    await this.iClick(MyproSelectors.MyProvisioningCorporate);
  }

  // This Method is used for selecting Menu buttons

  async clickMenuButtons(button: string) {
    if (button == "Analyst") {
      await this.iClick(MyproSelectors.Analyst);
      try {
        await this.iWaitForSelector(MyproSelectors.CustomerList, Testdata.common.Project.TestProp.TimeoutLevel_3)
      } catch (error: any) {        //do nothing      
      } try {
        await this.iWaitForSelector(MyproSelectors.PeriodYear, Testdata.common.Project.TestProp.TimeoutLevel_3)
      } catch (error: any) {        //do nothing      
      } try {
        await this.iWaitForSelector(MyproSelectors.PeriodYearDropDown, Testdata.common.Project.TestProp.TimeoutLevel_3)
      } catch (error: any) {        //do nothing      
      }
      //await this.iWaitForPageLoad();
    }
    else if (button == "Approver") {
      await this.iClick(MyproSelectors.ApproverButton)
    }
  }

  // This method is used for selecting Year, Month, Country

  async clickOnYearMonthCountry(attribute: string, option: string) {
    if (attribute == "Period Year") {
      await this.iClick(MyproSelectors.PeriodYearDropDown);
      await this.iSelectValue(MyproSelectors.PeriodYearDropDown, option);
      console.log(attribute + " is selected")
      await this.iWaitForTimeout(Testdata.common.Project.TestProp.Delaylevel_3);
    }

    else if (attribute == "Period Month") {
      await this.iClick(MyproSelectors.PeriodMonthDropDown);
      await this.iSelectValue(MyproSelectors.PeriodMonthDropDown, option);
      console.log(attribute + " is selected")
    }

    else if (attribute == "Country") {
      await this.iClick(MyproSelectors.CountryDropDown);
      await this.iSelectValue(MyproSelectors.CountryDropDown, option);
      console.log(attribute + " is selected")
    }
  }

  async selectYearMonthCountryValues(year: string, month: string, country: string) {
    await this.iClick(MyproSelectors.PeriodYearDropDown);
    await this.iSelectValue(MyproSelectors.PeriodYearDropDown, year);
    await this.iClick(MyproSelectors.PeriodMonthDropDown);
    await this.iSelectValue(MyproSelectors.PeriodMonthDropDown, month);
    await this.iClick(MyproSelectors.CountryDropDown);
    await this.iSelectValue(MyproSelectors.CountryDropDown, country);
  }

  // This method is used for attaching Documents

  async AttachDocuments(file: string) {
    await this.iWaitForPageLoad();
    await this.iClick(MyproSelectors.UploadWlPlButton);

    await this.iWaitForTimeout(6000)
    await this.page.locator(MyproSelectors.BrowseButton).setInputFiles(eval("Testdata.features.My_Provision_App." + file));
    await this.iWaitForTimeout(Testdata.common.Project.TestProp.TimeoutLevel_2)
    await this.iClick(MyproSelectors.ImportButton);
    await this.iWaitForTimeout(Testdata.common.Project.TestProp.Delaylevel_4);
    await this.iClick(MyproSelectors.OkAfterImport);
    await this.iWaitForSelector(MyproSelectors.BackToCustomerList, Testdata.common.Project.TestProp.Delaylevel_4)
    await this.iClick(MyproSelectors.BackToCustomerList);
    await this.iClickwithTimeout
  }

  // This method is used for selecting buttons

  async selectingButton(button: string) {
    await this.iWaitForTimeout(Testdata.common.Project.TestProp.Delaylevel_4)
    if (button == "Submit All") {
      if (await this.iIsEnabled(MyproSelectors.SubmitAllButton)) {
        await this.iClick(MyproSelectors.SubmitAllButton);
        await this.iClick(MyproSelectors.YesButton);
        await this.iWaitForTimeout(3000)
        await this.iClick(MyproSelectors.HomeButton)
      }
      else {
        console.log(button + " button is disabled")
      }
    }

    else if (button == "Approve All") {
      if (await this.iIsVisible(MyproSelectors.ApproveAllButton)) {
        await this.iClick(MyproSelectors.ApproveAllButton);
        if (await this.iIsVisible(MyproSelectors.YesButton)) {
          await this.iClick(MyproSelectors.YesButton)
          console.log("Approved")
        }
      }
      else {
        console.log(button + " button is disabled")
      }
    }

    else if (button == "Release All") {
      if (await this.iIsVisible(MyproSelectors.ReleaseAllButton)) {
        await this.iClick(MyproSelectors.ReleaseAllButton);
        await this.iClick(MyproSelectors.YesButton)

      }
      else {
        console.log(button + " button is disabled")
      }
    }
  }

}