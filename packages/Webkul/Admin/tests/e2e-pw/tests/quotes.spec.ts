import { test } from "../fixtures/AdminFixtures";
import { AdminPage } from "../pages/AdminPage";
import { LeadData, LeadPage } from "../pages/LeadPage";
import OrganizationPage, { OrganizationData } from "../pages/OrganizationPage";
import PersonsPage, { PersonData } from "../pages/PersonsPage";
import { ProductPage } from "../pages/ProductPage";
import { QuotesPage, sampleQuoteData } from "../pages/QuotesPage";
import { generateDescription, generateEmail, generateLocation, generateName, generatePhoneNumber, generateSKU } from "../utils/faker";

test.describe("quotes mangement", async () => {

  const productData = {
    name: generateName(),
    description: generateDescription(),
    sku: generateSKU(),
    price: Math.floor(Math.random()*1000).toString(),
    quantity: Math.floor(Math.random()*100).toString()
};

  const organizationData: OrganizationData = {
  name:  generateName(),
  address: generateLocation() ,
  country: "IN",               // India country code
  state: "DL",                 // Delhi state code
  city: "New Delhi",
  postcode: "110015",
};
  const personData: PersonData = {
  name: generateName(),
  emails:generateEmail(),
  contactNumber:generatePhoneNumber(),
  jobTitle: generateName(),
  salesOwnerId: "1", // Example sales owner id
  organizationName: organizationData.name
};
  
    const leadData:LeadData = {
        title: generateName(),
        description: generateDescription(),
        value: (Math.floor(Math.random()*10000)).toString(),
        expectedCloseDate:"2028-12-31",
        person:personData,
        product:productData,
        organizationName:personData.organizationName
    };

    test("verify create quote",async({adminPage})=>{
       const organization= new OrganizationPage(adminPage);
       const person= new PersonsPage(adminPage);
       const quote= new QuotesPage(adminPage);
       const lead=new LeadPage(adminPage);
       const product= new ProductPage(adminPage);

      //  await lead.createLead(leadData);
      await quote.navigateToQuotesPage();
      await quote.createQuote(sampleQuoteData);

       
  
        
    })

})