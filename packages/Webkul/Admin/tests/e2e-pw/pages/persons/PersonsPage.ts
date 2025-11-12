import { Page } from "playwright/test";
import CoreLocators from "../../locator/CoreLocators";
import { generateEmail, generateFullName, generatePhoneNumber } from "../../utils/faker";
export type PersonData = {
    name: string;
    emails: string[];                     // array to hold multiple emails
    emailTypes: ("Work" | "Home" | "Add More")[];  // corresponding types for each email
    contactNumbers: string[];             // array to hold multiple contact numbers
    contactNumberTypes: ("Work" | "Home" | "Add More")[]; // types for contact numbers
    jobTitle: string;
    salesOwnerId: string;                 // id or value representing Sales Owner
    organizationName: string;
};


export default class PersonsPage extends CoreLocators{
    readonly page: Page;

    constructor(page:Page)
    {
        super(page),
        this.page=page
    }

    async navigageToPersonsPage()
    {
        await this.page.goto("admin/contacts/persons");
    }
async createPerson(personData:PersonData) {

    await this.navigageToPersonsPage();
    await this.createPersonLink.click();

    // Fill person details (use first email/phone if multiple provided)
    await this.personNameTextbox.fill(personData.name);
    if (personData.emails && personData.emails.length > 0) {
        await this.personEmailTextbox.fill(personData.emails[0]);
    }
    if (personData.contactNumbers && personData.contactNumbers.length > 0) {
        await this.personPhoneTextbox.fill(personData.contactNumbers[0]);
    }
    await this.personJobTitleTextbox.fill(personData.jobTitle || "");

    // Assign organization (if provided)
    if (personData.organizationName) {
        await this.personOrgSelectDiv.click();
        await this.personOrgSearchTextbox.fill(personData.organizationName);
        await this.personOrgListItem(personData.organizationName).click();
    }

    // Save person
    await this.savePersonButton.click();

    return { name: personData.name, email: personData.emails?.[0], phone: personData.contactNumbers?.[0] };
}
    

}