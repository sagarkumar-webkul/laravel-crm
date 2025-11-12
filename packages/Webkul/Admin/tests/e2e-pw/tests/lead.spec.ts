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
    const updatedLeadData = {
            title: generateName(),
            description: generateDescription(),
            email: generateEmail(),
            phone: generatePhoneNumber(),
    };

    const date=new Date();
    
    


    test("should create a new lead", async ({ adminPage }) => {
        const leadPage = new LeadPage(adminPage);

        await leadPage.navigateToLeadList();

        await leadPage.createLeadButton.click();

        await leadPage.titleInput.fill(leadData.title);
        await leadPage.descriptionTextarea.fill(leadData.description);
        await leadPage.sourceDropdown.selectOption("1");
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



        (await leadPage.getElementByTypeAndName('button',"Save")).click();
        await leadPage.searchInput.fill(leadData.title);
        await leadPage.page.keyboard.press('Enter');
        await expect((await leadPage.getLeadByTitle(leadData.title))).toBeVisible();

       
        await expect(leadPage.leadSuccessToast).toBeVisible();



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
         leadPage= new LeadPage(page1);
        // Use locators from LeadPage via page1 context to fill fields
        await leadPage.titleInput.fill(updatedLeadData.title);
        await leadPage.descriptionTextarea.fill(updatedLeadData.description);
        await leadPage.sourceDropdown.selectOption("1");
        await leadPage.typeDropdown.selectOption("1");
        await leadPage.userDropdown.selectOption("1");
        await leadPage.leadValueInput.fill("1000");
        (await leadPage.getElementByTypeAndName('button',"Save")).click();
        await leadPage.searchInput.fill(updatedLeadData.title);
        await leadPage.page.keyboard.press('Enter');
        await expect(((await leadPage.getLeadByTitle(updatedLeadData.title)).first())).toBeVisible();
       
        await expect(leadPage.leadSuccessToast).toBeVisible();
      
    });
    test("user should able to delete the lead",async({adminPage})=>{
        const leadPage= new LeadPage(adminPage);
    

        await leadPage.navigateToLeadList();

        await leadPage.listViewButton.click();

        (await leadPage.getElementByTypeAndName('textbox','Search')).fill(updatedLeadData.title);
        await leadPage.page.keyboard.press('Enter');
        await leadPage.deleteLeadButton.isVisible();
        await leadPage.deleteLeadButton.click();
        await (await leadPage.getElementByTypeAndName('button','Agree')).click();
        (await leadPage.getElementByTypeAndName('textbox','Search')).fill(updatedLeadData.title);
        await leadPage.page.keyboard.press('Enter');
        await expect(leadPage.deleteLeadButton).not.toBeVisible();
        
        
       
        


    })


})