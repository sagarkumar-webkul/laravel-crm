import { test,expect } from "../fixtures/AdminFixtures";
import { LeadPage } from "../pages/leads/LeadPage";
import { generateDescription, generateEmail, generateName, generatePhoneNumber } from "../utils/faker";


test.describe("lead management",async()=>{

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

})