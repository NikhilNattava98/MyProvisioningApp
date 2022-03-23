import { assert } from 'chai';
import { Page } from 'playwright';
import { commonPage } from '..';
import * as Testdata from "../../../testdata/testdata.json";
import HelperMethods from '../../helpers/HelperMethods';
import { UtilityFunction } from '../../utils/utillFunc';
import * as CommonPageSelectors from './CommonPage.selectors.json';

export class CommonPage extends HelperMethods {

    // customer: string = eval("Testdata.features." + process.env.CurrentFeatureName + ".FilterData");
    utils = new UtilityFunction(this.page);
    map = new Map<string, number>();

    constructor(page: Page) {
        super(page);

    }

    async LogOut() {
        await this.iClick(CommonPageSelectors.ButtonLogout)
        await this.iWaitForPageLoad()

    }

    async NavigateURL(url: string) {
        await this.page.goto(url)
    }

    /**
    * This method is use to validate popup 
    */

    async validatePopUpDisplayed(popupName: string) {
        try {
            await this.iWaitForTimeout(Testdata.common.Project.TestProp.TimeoutLevel_1)
            if (popupName == "Relate existing Customer") {
                var title: string = await this.utils.getTextContent(CommonPageSelectors.AddRelationPopUp);
            }
            else if (popupName == "Change Relation") {
                title = await this.utils.getTextContent(CommonPageSelectors.ChangeRelationTitle);
            }
            else {
                await this.iWaitForSelector(CommonPageSelectors.PopupTitle, 1500);
                title = await this.utils.getTextContent(CommonPageSelectors.PopupTitle);
            }
        }
        catch {
            try {
                title = await this.utils.getTextContent(CommonPageSelectors.CustomerTitle);
            }
            catch {
                title = await this.utils.getTextContent(CommonPageSelectors.Title);
            }
        }
        console.log(title);
        assert(title?.includes(popupName), popupName + " is not displayed correctly");
    }

    /**
     * This method is used to click on Create New Customer Button
     */

    async clickOnCreateNewCustomerButton() {
        await this.iClick(CommonPageSelectors.CreateNewCustomer);
    }


    /**
     * This method is used to click on Button 
     */

    async clickOnButton(buttonName: string) {
        await this.iClick("text='" + buttonName + "'");
        await this.iWaitForTimeout(Testdata.common.Project.TestProp.TimeoutLevel_1);
    }

    /**
    * This metos is used to verify new FA Tab is displayed 
    */

    async VerifyNewTab(tabName: string) {
        await this.iWaitForTimeout(Testdata.common.Project.TestProp.Delaylevel_4);
        let objutil = new UtilityFunction(this.page);
        var textList = await objutil.getTextContentList(CommonPageSelectors.OuterTabs);
        if (tabName == "FA") {
            assert(textList.length == 2, "Only two tab should be open");
            textList.forEach(async (value) => {
                assert(value.includes(process.env.CUSTOMER_NAME!), "Tab list contains Customer Name");
                if (value.includes(tabName)) {
                    assert(value.includes(tabName + " | " + process.env.CUSTOMER_NAME), "FA for the given cusomer is not displayed");
                    await this.iClickText(value);
                    await this.iWaitForTimeout(Testdata.common.Project.TestProp.TimeoutLevel_1);
                }
            });
        }
        else if (tabName == "Customer") {
            assert(textList.length == 1, "Only One tab should be open");
            var innerTab = await objutil.getTextContentList(CommonPageSelectors.InnerTabs);
            console.log(innerTab);
            assert(innerTab.includes("Customer Dashboard"), "user is not on Customer dashboard");

        }
        else if (tabName == "Bundle") {
            console.log(textList[0]);
            assert(await textList[0].includes("Bundle " + process.env.CUSTOMER_NAME), "Title do not include Customer name");
        }

        else if (tabName == "Customer Bundle") {
            assert(await textList[0].includes("Bundle " + process.env.CUSTOMER_NAME), "Title do not include Customer name");
            assert(await this.iIsVisible(CommonPageSelectors.CusromerGroupIcon), "Group Icon is not present")
        }

        else if (tabName == "Customer Group") {
            assert(await textList[0].includes("Group " + process.env.CUSTOMER_NAME), "Title do not include Customer name");
            assert(await this.iIsVisible(CommonPageSelectors.CusromerGroupIcon), "Group Icon is not present")
        }
    }

    /**
       * This method is used to click on CustomerTab
       */
    async clickOnCustomerTab() {
        await this.iClick(CommonPageSelectors.OuterTabs + "/..//*[text()='" + process.env.CUSTOMER_NAME + "']")
    }

    /**
     * This methos is used to get all tabs name present in the screen
     */
    async getAllInnerTabsName() {
        await this.iWaitForTimeout(Testdata.common.Project.TestProp.TimeoutLevel_2);
        var taName = await this.utils.getTextContentList(CommonPageSelectors.InnerTabs);
        taName.forEach((value, index) => {
            this.map.set(value, index);
        });
        return this.map;
    }

    /**
   * This method is used to get all opened tabs name present in the screen
   */
    async getAllOuterTabsName() {
        var taName = await this.utils.getTextContentList(CommonPageSelectors.OuterTabs);
        taName.forEach((value, index) => {
            this.map.set(value, index);
        });
        return this.map;
    }

    /**This method is used to clikc on inner Tab
     * 
     */

    async clickOnInnerTabName(tabname: string) {
        this.map = await this.getAllInnerTabsName();
        var index = await this.map.get(tabname);
        var list = await this.utils.getContentList(CommonPageSelectors.InnerTabs);
        await list[Number(index)].click();
        await this.iWaitForTimeout(Testdata.common.Project.TestProp.TimeoutLevel_3);
    }

    /**
     * This method is used to click on Home page
     */

    async ClickOnHomePage() {
        await this.iClick(CommonPageSelectors.HomeTab);
    }

    /**
     * This method is used to slect value form dropdown
     */

    async selectValueFromDropDown(relationType: string) {
        await this.iClickDropDown(relationType);
    }

    /**
     * This method is used to click on the dropdown
     */

    async clickOnDropDown(dropdown: string) {
        if (dropdown == "Group Support View") {
            await this.iClick(CommonPageSelectors.GroupSupportViewDropDown);
        }
        else if (dropdown == "Select Group Support Criteria")
            await this.iClick(CommonPageSelectors.SelecrGroupSupportCriteriaDP);
    }

    /**
     * This method is used to verify the option in dropdown
     */

    async VerifyOptionInDropDown(option: string) {
        var list = await this.utils.getTextContentList(CommonPageSelectors.DropDownOptions);
        assert(list.includes(option), "Given option - " + option + " is not present in the dropdown " + list)
        await this.iClick(CommonPageSelectors.AddOrEditGroup);
    }
}