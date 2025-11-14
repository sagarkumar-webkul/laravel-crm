import { test, expect } from "../fixtures/AdminFixtures";
import CoreLocators from "../locator/CoreLocators";
import { LeadData, LeadPage } from "../pages/LeadPage";
import PersonsPage, { PersonData } from "../pages/PersonsPage";
import { ProductData } from "../pages/ProductPage";
import { generateDescription, generateEmail, generateName, generatePhoneNumber, generateSKU } from "../utils/faker";


test.describe("lead management", async () => {

    const personData: PersonData = {
        name: generateName(),
        emails: generateEmail(),
        contactNumber: generatePhoneNumber(),
        jobTitle: generateName(),
        salesOwnerId: "1", // Example sales owner id
        organizationName: "Example"
    }

    const productData: ProductData = {
        name: generateName(),
        description: generateDescription(),
        sku: generateSKU(),
        price: "100",
        quantity: "50"
    }

    const leadData: LeadData = {
        title: generateName(),
        description: generateDescription(),
        value: (Math.floor(Math.random() * 10000)).toString(),
        expectedCloseDate: "2028-12-31",
        person: personData,
        product: productData,
        organizationName: personData.organizationName
    };
    const updatedLeadData = {
        title: generateName(),
        description: generateDescription(),
        email: generateEmail(),
        phone: generatePhoneNumber(),
    };

    const date = new Date();




    test("should create a new lead", async ({ adminPage }) => {

        const leadPage = new LeadPage(adminPage);
        const personPage = new PersonsPage(adminPage);

        await personPage.createPerson(personData);
        await leadPage.createLead(leadData);



    });

    test("should update an existing lead", async ({ adminPage }) => {
        let leadPage = new LeadPage(adminPage);


        // Now update the lead with new data

        // Fill updated lead data
        await leadPage.navigateToLeadList();
        await leadPage.searchInput.fill(leadData.title);
        await leadPage.page.keyboard.press('Enter');
        await Promise.all([
            leadPage.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
            (await leadPage.getLeadByTitle(leadData.title)).click(),
        ]);
        const page1Promise = leadPage.page.waitForEvent('popup');
        await leadPage.editLeadButton.click();

        const page1 = await page1Promise;
        leadPage = new LeadPage(page1);
        // Use locators from LeadPage via page1 context to fill fields
        await leadPage.titleInput.fill(updatedLeadData.title);
        await leadPage.descriptionTextarea.fill(updatedLeadData.description);
        await leadPage.sourceDropdown.selectOption("1");
        await leadPage.typeDropdown.selectOption("1");
        await leadPage.userDropdown.selectOption("1");
        await leadPage.leadValueInput.fill("1000");
        (await leadPage.getElementByTypeAndName('button', "Save")).click();
        await leadPage.searchInput.fill(updatedLeadData.title);
        await leadPage.page.keyboard.press('Enter');
        await expect(((await leadPage.getLeadByTitle(updatedLeadData.title)).first())).toBeVisible();

        await expect(leadPage.leadSuccessToast).toBeVisible();

    });
    test("user should able to delete the lead", async ({ adminPage }) => {
        const leadPage = new LeadPage(adminPage);


        await leadPage.navigateToLeadList();

        await leadPage.listViewButton.click();

        (await leadPage.getElementByTypeAndName('textbox', 'Search')).fill(updatedLeadData.title);
        await leadPage.page.keyboard.press('Enter');
        await leadPage.deleteLeadButton.isVisible();
        await leadPage.deleteLeadButton.click();
        await (await leadPage.getElementByTypeAndName('button', 'Agree')).click();
        (await leadPage.getElementByTypeAndName('textbox', 'Search')).fill(updatedLeadData.title);
        await leadPage.page.keyboard.press('Enter');
        await expect(leadPage.deleteLeadButton).not.toBeVisible();






    })


})