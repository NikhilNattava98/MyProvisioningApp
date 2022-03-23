import { ICreateAttachment, ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";
import { Page } from "playwright";
import { CustomWorld } from "../main.driver";

//Class is used to create methods of Playwright and it can be called in other classes and functions
export default class HelperMethods implements CustomWorld {
    attach: ICreateAttachment;
    log: ICreateLog;
    parameters: any;
    protected page: Page;
    constructor(page: Page) {
        this.page = page;
    }


    /**
     * Wrapper function for Fill, used to type text inside a text box
     * @param {string} selector - The selector of the element.
     * @param {string} value - The value to be typed inside the element.
     */
    protected iFill(selector: string, value: string) {
        return this.page.fill(selector, value)
    }
    // /**
    //  * Wrapper function for screenshot, used to take element screen shot
    //  * @param {string} screenPrint - CustomWorld interface
    //  * @param {any} element - Web element
    //  */
    // public async iElementScreenshot(element: any, screenPrint: CustomWorld) {
    //     const elementHandle = await this.page.$(element);
    //     let screenshot = await elementHandle?.screenshot();
    //     await screenPrint.attach(screenshot, "image/png");
    // }
    /**
     * Wrapper function for screenshot, used to take full page screen shot
     * @param {string} screenPrint - CustomWorld interface
     */
    public async iScreenshot(screenPrint: CustomWorld) {
        let browser = screenPrint.AUT_Application?.browser!;
        if (await browser.isConnected()) {
            let screenshot = await this.page.screenshot({ fullPage: true })
            await screenPrint.attach(screenshot, "image/png");
        }
    }
    public async iGetParameter(screen: CustomWorld, data: any) {
        await screen.attach(Buffer.from(data).toString('base64'));
    }

    /**
     * Wrapper function for Click, used to click on the element
     * @param {string} selector - The selector of the element.
     */
    protected iClick(selector: string) {
        this.iWaitForSelector(selector, 10000);
        return this.page.click(selector)
    }

    /**
    * Wrapper function for Click, used to click on the element in dropDown
    * @param {string} selector - The selector of the element.
    */
    protected iClickDropDown(selector: string) {

        return this.page.click("//span[text()='" + selector + "']")
    }
    /**
     * Wrapper function for Click, used to click on the element
     * @param {string} selector - The selector of the element.
     */
    protected iClickNewPage(selector: string, page: Page) {
        return page.click(selector)
    }

    /**
     * Wrapper function for Double Click, used to click on the element
     * @param {string} selector - The selector of the element.
     */
    protected iDoubleClick(selector: string) {
        return this.page.dblclick(selector);
    }

    /**
     * 
     * @param selector Wrapper function to select the element having text
     * @returns 
     */
    protected iClickText(text: string) {
        return this.page.click("//*[text()='" + text + "']");
    }
    /**
     * Wrapper function for check, used to check on the element
     * @param {string} selector - The selector of the element.
     */
    protected iCheck(selector: string) {
        return this.page.check(selector)
    }

    protected iClickwithTimeout(selector: string) {
        return this.page.click(selector, { timeout: 60000 })
    }

    protected getFirstRowfromTable(selector: string) {
        return this.page.$(`${selector} > tr:first-child`)
    }

    protected getNumberOfRowsTable(selector: string): Promise<number> {
        return this.page.$$eval(selector, ele => ele.length)
    }

    protected iHighlight(selector: string) {
        return this.page.focus(selector)
    }

    protected iWaitForPageLoad() {
        this.page.setDefaultTimeout(70000);
        return this.page.waitForLoadState("domcontentloaded");
    }

    public iWaitForTimeout(timeout: any) {
        return this.page.waitForTimeout(timeout)
    }
    protected iWaitForSelector(selector: string, time: number) {
        return this.page.waitForSelector(selector, { timeout: time, state: 'attached' });
    }

    protected iActivatePage() {
        return this.page.bringToFront()
    }

    protected iSelectValue(selector: string, value: string) {
        return this.page.selectOption(selector, { label: value })
    }

    protected iWaitForNavigation() {
        return this.page.waitForNavigation()
    }

    protected iWaitForEvent(event: any) {
        return this.page.waitForEvent(event)
    }

    protected iFrameClick(selector: string, frameurl: string) {
        return this.page.frame({
            url: frameurl
        })?.click(selector);
    }

    protected iGetAtrribute(selector: string, attr: string) {
        return this.page.getAttribute(selector, attr)
    }

    protected iGetAtrributenthElement(selector: string, attr: string, nth: number) {
        return this.page.getAttribute("(" + selector + ")[" + nth + "]", attr)
    }

    protected iType(selector: string, value: string) {
        return this.page.type(selector, value)
    }

    public async iAttach(screen: CustomWorld, data: any) {
        await screen.attach(Buffer.from(data), "application/pdf");
    }

    /**
     * Wrapper function for visible, used to check whether element is present or not
     * @param {string} selector - The selector of the element.
     */
    protected iIsVisible(selector: string) {
        return this.page.isVisible(selector);
    }

    /**
    * Wrapper function for enabled, used to check whether element is enabled or not
    * @param {string} selector - The selector of the element.
    */
    protected iIsEnabled(selector: string) {
        return this.page.isEnabled(selector);
    }

    /**
   * Wrapper function for disabled, used to check whether element is disabled or not
   * @param {string} selector - The selector of the element.
   */
    protected iIsDisabled(selector: string) {
        return this.page.isDisabled(selector);
    }

    /**
     * Wrapper function to get count of element present
     * @param selector 
     */
    protected async iGetElementCount(selector: string) {
        let element = await this.page.$$(selector);
        return element.length;
    }
    /**
     * Wrapper method to scrool page down
     */
    protected async iScrollToElement(selector: string) {
        await this.page.$eval(selector, (element) => {
            element.scrollIntoView();
        });
    }

    /**
     * Wrapper method to scrool page vertically
     */
    protected iVerticalScroll(selector: string) {
        this.iWaitForSelector(selector, 10000);
        return this.page.mouse.wheel(600, 0)
    }

    /**
     * Wrapper method to hover on icon
     */
    protected iHover(selector: string) {
        this.iWaitForSelector(selector, 10000);
        return this.page.hover(selector)
    }

    /**
     * Wrapper method is get list of elements
     */
    protected igetListOfElements(selector: string) {
        return this.page.$$(selector);
    }

    /**
     * Wrapper method to select nth Element
     * n is element lenght
     * starts form 1
     */
    protected iClickNthElement(selector: string, nth: number) {
        return this.page.click("(" + selector + ")[" + nth + "]");
    }

    /**
     * Wrapper method to select nth Element by double clicking the element
     */
    protected iDoubleClickNthElement(selector: string, nth: number) {
        return this.page.dblclick("(" + selector + ")[" + nth + "]");
    }

    /**
     * wrapper method to press keyboard
     */
    protected iPressKeyBoard(key: string) {
        return this.page.keyboard.press(key);
    }

    /**
     * switch
     */
    protected async switchToNewWindowAfterDoubleClick(content: CustomWorld, selector: string, count: number) {
        const [newWindow] = await Promise.all([
            content.AUT_Application?.context.waitForEvent("page"),
            this.iDoubleClickNthElement(selector, count)
        ])
        await newWindow?.setDefaultTimeout(750 * 10000);
        await newWindow?.waitForLoadState("domcontentloaded");
    }

    /**
     * This method is used to switch the new page
     */

    public async switchToNewPage(conent: CustomWorld) {
        var count = await conent.AUT_Application?.context.pages().length;
        var i = count! - 1;
        let page = conent.AUT_Application?.context.pages()[i]!;
        let browser = conent.AUT_Application?.browser!;
        let context = conent.AUT_Application?.context!;
        console.log()
        return { browser, page, context };
    }

    /**
    * This method is used to switch the default page
    */

    public async switchToDefaultPage(conent: CustomWorld) {
        console.log("Switch to default Page");
        let page = conent.AUT_Application?.context.pages()[0]!;
        let browser = conent.AUT_Application?.browser!;
        let context = conent.AUT_Application?.context!;
        return { browser, page, context };
    }

    /**
    * This method is used to refresh the page
    */
    public iRefresh() {
        return this.page.reload({ timeout: 60000, waitUntil: 'domcontentloaded' })
    }

    protected async iUploadFile(selector: string, path: string) {
        await this.iWaitForPageLoad();
        const [fileChooser] = await Promise.all([this.page.waitForEvent('filechooser'),
        await this.page.dblclick(selector)]);
        await fileChooser.setFiles(path)
    }



}