import { World } from '@cucumber/cucumber';
import { assert } from 'chai';
import playwright, { Browser, ChromiumBrowserContext, devices, Page } from 'playwright';
import * as Testdata from './../testdata/testdata.json';
import { CommonPage } from './page_objects/common/CommonPage';
import { MyPropage } from './page_objects/MyProApp/MyPropage';
import { UtilityFunction } from './utils/utillFunc';

export class AUTApplication extends CommonPage {
  public Mypropage: MyPropage;
  public browser: Browser;
  public CommonPage: CommonPage;
  public UtilityFunction: UtilityFunction;
  public context: ChromiumBrowserContext;
  public NewPage: Page | undefined;
  constructor({ browser, page, context }: { browser: Browser, page: Page, context: ChromiumBrowserContext }) {
    super(page);
    this.browser = browser
    this.context = context
    this.UtilityFunction = new UtilityFunction(page);
    this.Mypropage = new MyPropage(page);
    this.CommonPage = new CommonPage(page);
  }

  async closeBrowser() {
    await this.page.close();
    return this.browser.close();
  }
}

export const LaunchApplication = async function () {
  let headlessmode = JSON.parse(Testdata.common.Project.BrowserProp.Headless);
  let browser = await playwright.chromium.launch({
    headless: headlessmode,
    // proxy : {
    //   server: 'http://security-proxy.emea.svc.corpintra.net:3128',
    //   bypass: 'localhost,*.corpintra.*',
    // },
    // args: ['--ignore-certificate-errors' ],
    // ignoreDefaultArgs: ['--disable-extensions'],
    // args: ["--start-maximized"]
    // chromiumSandbox : false,
    // slowMo:20,
    // timeout: 10000
    // executablePath: "C:/Users/dsmonis/AppData/Local/ms-playwright/chromium-888113/chrome-win/chrome.exe" //This line is required for Jenkins run
  })
  const iPhoneX = devices['iPhone X'];
  const runDevice = Testdata.common.Project.Devices.Device;

  let context: ChromiumBrowserContext = await browser.newContext({
  });
  if (runDevice === "iphone") {
    context = await browser.newContext({
      acceptDownloads: true,
      viewport: iPhoneX.viewport,
      userAgent: iPhoneX.userAgent,
    });
  } else if (runDevice === "laptop") {
    context = await browser.newContext({
      acceptDownloads: true,
    });
  }

  let page = await context.newPage();
  let appURL: any

  appURL = eval("Testdata.common.application.MPA.MyPrApp");
  try {
    await page.goto(appURL, { waitUntil: 'load', timeout: 0 });
  } catch (error: any) {
    console.log("Browser Timeout", error);
    await browser.close();
    return assert.fail(error);
  }
  return { browser, page, context }

}

export interface CustomWorld extends World {
  AUT_Application?: AUTApplication;
}


