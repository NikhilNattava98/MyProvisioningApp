import { assert } from 'chai';
import * as Testdata from '../../testdata/testdata.json';
import helperMethods from '../helpers/HelperMethods';

export class UtilityFunction extends helperMethods {

    async getRandomInt(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    /**
     * This function is used to validate the element on the page
     * @async
     * @function ValidateElement
     * @param {string} selector - WebElement
     * */
    async ValidateElement(selector: string) {
        try {
            await this.iWaitForSelector(selector, Testdata.common.Project.TestProp.TimeoutLevel_3)
        } catch (error: any) {
            assert.fail(error)
        }
    }

    /**
     * This function is used to navigate particular page/screen
     * @async
     * @function NavigateMenu
     * @param {string} selector - Menu Element
     * */
    async NavigateMenu(selector: string) {
        await this.iClick(selector)
        await this.iWaitForPageLoad()
        await this.iWaitForTimeout(Testdata.common.Project.TestProp.Delaylevel_1)
    }

    /**
     * This function is used to check field is disabled or not on particular page/screen
     * @async
     * @function Checkfieldisdisabled
     * @param {string} selector - field
     * @param {string} field - field name
     * */
    async Checkfieldisdisabled(selector: string, field: string) {
        const attrval = await this.iGetAtrribute(selector, "enabled")
        if (attrval === "false") {
            return ("Not Editable")
        } else {
            assert.fail(field + ": Should be non editable field")
        }

    }

    /**
     * This function is used to check button is disabled or not on particular page/screen
     * @async
     * @function Checkbuttonisdisabled
     * @param {string} selector - field
     * @param {string} field - field name
     * */
    async Checkbuttonisdisabled(selector: string, field: string) {
        const isDisabled = await this.page.$eval(selector, (button: { hasAttribute: (arg0: string) => any; }) => {
            return button.hasAttribute('disabled')
        });
        if (isDisabled === true) {
            return ("Not Editable")
        } else {
            assert.fail(field + ": Should be non editable field")
        }
    }

    /**
     * This function is used to check input field is disabled or not on particular page/screen
     * @async
     * @function CheckInputfieldisdisabled
     * @param {string} selector - field
     * @param {string} field - field name
     * */
    async CheckInputfieldisdisabled(selector: string, field: string) {
        const attrval = await this.iGetAtrribute(selector, "disabled")
        if (attrval === "true") {
            return ("Not Editable")
        } else {
            assert.fail(field + ": Should be non editable field")
        }

    }

    /**
     * This function is used to check Kendo-switch field is disabled or not on particular page/screen
     * @async
     * @function CheckfieldisdisabledKendoSwitch
     * @param {string} selector - field
     * @param {string} field - field name
     * */
    async CheckfieldisdisabledKendoSwitch(selector: string, field: string) {
        const attrval = await this.iGetAtrribute(selector, "aria-disabled")
        if (attrval === "true") {
            return ("Not Editable")
        } else {
            assert.fail(field + ": Should be non editable field")
        }

    }

    /**
     * This function is used to get current system date
        * @function GetCurrentDate
     * */
    GetCurrentDate() {
        let date_ob = new Date();
        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);
        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // current year
        let year = date_ob.getFullYear();
        // prints date in DD/MM/YYYY format
        return (date + "/" + month + "/" + year);
    }

    /**
     * This function is used to add system date
     * @async
     * @function DateAdd
     * */
    async DateAdd(days: string) {
        var futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + parseInt(days));

        let date = ("0" + futureDate.getDate()).slice(-2);
        // current month
        let month = ("0" + (futureDate.getMonth() + 1)).slice(-2);

        console.log(month)
        // Get year
        let year = futureDate.getFullYear();
        // prints date in DD/MM/YYYY format
        console.log((date.toString() + month.toString() + year.toString()))
        return (date.toString() + month.toString() + year.toString());
    }

    /**
    * This function is used to add system date
      * @function dateDelete
    * */
    DateDelete(days: string) {
        var previousDate = new Date();
        previousDate.setDate(previousDate.getDate() - parseInt(days));
        let date = ("0" + previousDate.getDate()).slice(-2);
        // current month
        let month = ("0" + (previousDate.getMonth() + 1)).slice(-2);

        // Get year
        let year = previousDate.getFullYear();
        // prints date in DD/MM/YYYY format
        console.log((date.toString() + month.toString() + year.toString()))
        return (date.toString() + month.toString() + year.toString());
    }

    /**
     * This function is used to get text content of given field
     * @async
     * @function GetTextContent
     * @param {string} selector - field
     * */
    async getTextContent(selector: string) {
        try {
            await this.iWaitForSelector(selector, 5000)
            let element: any = await this.page.$(selector)
            return (await this.page.evaluate((el: { textContent: any; }) => el.textContent, element))
        } catch (error) {
            assert.fail("Element not found : " + error)
        }
    }

    /**
       * This function is used to get text content of given field
       * @async
       * @function GetTextContent
       * @param {string} selector - field
       * */
    async getTextContentList(selector: string) {

        try {
            var alphas: string[] = [];
            await this.iWaitForSelector(selector, 10000);
            let element = await this.page.$$(selector);
            for (var i = 0; i < element.length; i++) {
                alphas[i] = await this.page.evaluate((el: { textContent: any; }) => el.textContent, element[i])
            }
            return alphas;

        }
        catch (error) {
            assert.fail("Element not found : " + error)
        }
    }

    /**
       * This function is used to get content of given field
       * @async
       * @function GetTextContent
       * @param {string} selector - field
       * */
    async getContentList(selector: string) {

        try {
            await this.iWaitForSelector(selector, 10000);
            return await this.page.$$(selector);

        }
        catch (error) {
            assert.fail("Element not found : " + error)
        }
    }

}


