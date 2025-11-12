import { Page } from "playwright/test";
import CoreLocators from "../../locator/CoreLocators";
import { generateFirstName, generateLocation } from "../../utils/faker";
type Organization = {
    name: string;
    address: string;
    country: string; // country code, e.g. 'IN'
    state: string;   // state code, e.g. 'DL'
    city: string;
    postcode: string;
    extraDetailSearchTerm: string;
    extraDetailSelectText: string;
};

export default class OrganizationPage extends CoreLocators{

    
    readonly page:Page
    constructor(page:Page)
    {
        super(page)
        this.page=page

    }
    async navigateToOrganization()
    {
       await  this.page.goto("admin/contacts/organizations");
    }

    async createOrganization(orgData:Organization) {
   
    await this.navigateToOrganization();

  
    await this.createOrgLink.click();

    // Fill organization details
    await this.orgNameTextbox.fill(orgData.name);
    await this.orgAddressTextarea.fill(orgData.address);

    await this.orgCountryCombobox.selectOption(orgData.country);
    await this.orgStateSelect.selectOption(orgData.state);

    await this.orgCityTextbox.fill(orgData.city);
    await this.orgPostcodeTextbox.fill(orgData.postcode);

    await this.orgExtraDetailsDiv.nth(2).click();

    await this.orgSearchTextbox.fill('exampl');
    await this.orgExampleListItem('Example').click();


    // Save organization
    await this.saveOrganizationButton.click();
    return orgData;
    }
    

}