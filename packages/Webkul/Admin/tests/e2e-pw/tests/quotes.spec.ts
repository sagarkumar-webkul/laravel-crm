import { test } from "../fixtures/AdminFixtures";
import { AdminPage } from "../pages/admin/AdminPage";
import { LeadPage } from "../pages/leads/LeadPage";
import OrganizationPage from "../pages/organization/OrganizationPage";
import PersonsPage, { PersonData } from "../pages/persons/PersonsPage";
import { QuotesPage } from "../pages/quotes/QuotesPage";
import { generateDescription, generateEmail, generateName, generatePhoneNumber } from "../utils/faker";

test.describe("quotes mangement", async () => {

  const personData: PersonData = {
  name: "John Doe",
  emails: ["john.doe@workemail.com", "john.home@example.com"],
  emailTypes: ["Work", "Home"],
  contactNumbers: ["+1234567890", "+0987654321"],
  contactNumberTypes: ["Work", "Home"],
  jobTitle: "Senior Software Engineer",
  salesOwnerId: "1", // Example sales owner id
  organizationName: "Example"
};
  const orgData={
  name: "My Company",
  address: "123 Main Street",
  country: "IN",
  state: "DL",
  city: "Delhi",
  postcode: "110001",
  extraDetailSearchTerm: "exampl",
  extraDetailSelectText: "Example"
  }

  const sampleBillingAddress = {
  address: "123 Billing St, ARV Park",
  countryCode: "IN",
  stateCode: "DL",
  city: "Delhi",
  postcode: "110001",
};
const sampleQuoteData = {
  subject: "Quote for Q4 Project",
  description: "Detailed quote for the upcoming Q4 project including all requested features.",
  salesOwnerId: "1",  // Example sales owner id
  expiredAt: "2025-12-31",
  personName: "John Doe",
  leadName: "Lead Company Inc.",
  // quoteItems can be added here as necessary
};
    const leadData = {
        title: generateName(),
        description: generateDescription(),
        email: generateEmail(),
        phone: generatePhoneNumber(),
        person:personData,
    };




    test("verify create quote",async({adminPage})=>{
       const organization= new OrganizationPage(adminPage);
       const person= new PersonsPage(adminPage);
       const quote= new QuotesPage(adminPage);
       const lead=new LeadPage(adminPage);

       await lead.createLead(leadData);

      /* first create organization for the quote*/
       
      // await organization.createOrganization(orgData);

      /* than create person for the quote */

      // await  person.createPerson(personData);

      await quote.createQuote(sampleQuoteData,sampleBillingAddress)

      
       
       
  
        
    })

})