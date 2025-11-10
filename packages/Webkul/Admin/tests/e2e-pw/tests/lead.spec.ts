import { test, expect } from "../fixtures/AdminFixtures";
import CoreLocators from "../locator/CoreLocators";
import { LeadPage } from "../pages/leads/LeadPage";
import { generateDescription, generateEmail, generateName, generatePhoneNumber } from "../utils/faker";


test.describe("lead management", async () => {

    const leadData = {
        title: generateName(),
        description: generateDescription(),
        email: generateEmail(),
        phone: generatePhoneNumber(),
    };
    


    test("should create a new lead", async ({ adminPage }) => {
        const leadPage = new LeadPage(adminPage);

        await leadPage.navigateToLeadList();

        await leadPage.createLeadButton.click();

        await leadPage.titleInput.fill(leadData.title);
        await leadPage.descriptionTextarea.fill(leadData.description);
        await leadPage.sourceDropdown.selectOption("1");
        await leadPage.expectedCloseDate.fill("2025-11-10");
        await leadPage.typeDropdown.selectOption("1");
        await leadPage.userDropdown.selectOption("1");
        await leadPage.leadValueInput.fill("1000");

        await leadPage.addPersonButton.click();
        await leadPage.personSearchInput.fill(leadData.title);
        await leadPage.addAsNewButton.click();
        await leadPage.personEmailInput.fill(leadData.email);
        await leadPage.personPhoneInput.fill(leadData.phone);

        await leadPage.addOrganizationButton.click();
        await leadPage.organizationSearchInput.fill(leadData.title);
        await leadPage.addAsNewButton.click();

        await leadPage.saveLead();



    });

    test("should update an existing lead", async ({ adminPage }) => {
        const leadPage = new LeadPage(adminPage);
        const coreLocators =await new CoreLocators(adminPage);

        // Now update the lead with new data
        const updatedLeadData = {
            title: generateName(),
            description: generateDescription(),
            email: generateEmail(),
            phone: generatePhoneNumber(),
        };

        // Fill updated lead data
        await leadPage.navigateToLeadList();
        await leadPage.searchInput.fill(leadData.title);
        await leadPage.page.keyboard.press('Enter');
        await leadPage.titleInput.fill(updatedLeadData.title);
        await leadPage.descriptionTextarea.fill(updatedLeadData.description);
        await leadPage.sourceDropdown.selectOption("2"); // Change source
        await leadPage.expectedCloseDate.fill("2025-12-31"); // Update close date
        await leadPage.typeDropdown.selectOption("2"); // Change type
        await leadPage.leadValueInput.fill("2000"); // Update lead value

        // Update person details
        await leadPage.personEmailInput.fill(updatedLeadData.email);
        await leadPage.personPhoneInput.fill(updatedLeadData.phone);

        // Save the updated lead
        await leadPage.saveLead();

        // Verify the updates were successful
        await expect(leadPage.titleInput).toHaveValue(updatedLeadData.title);
        await expect(leadPage.descriptionTextarea).toHaveValue(updatedLeadData.description);
        await expect(leadPage.leadValueInput).toHaveValue("2000");
        await expect(leadPage.personEmailInput).toHaveValue(updatedLeadData.email);
        await expect(leadPage.personPhoneInput).toHaveValue(updatedLeadData.phone);
    });


})