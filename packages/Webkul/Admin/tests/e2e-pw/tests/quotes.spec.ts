import { test } from "../fixtures/AdminFixtures";
import { AdminPage } from "../pages/AdminPage";
import { LeadData, LeadPage } from "../pages/LeadPage";
import OrganizationPage, { OrganizationData } from "../pages/OrganizationPage";
import PersonsPage, { PersonData } from "../pages/PersonsPage";
import { ProductPage } from "../pages/ProductPage";
import { quoteData, QuotesPage, } from "../pages/QuotesPage";
import { generateDescription, generateEmail, generateLocation, generateName, generatePhoneNumber, generateSKU } from "../utils/faker";

test.describe("quotes mangement", async () => {

  test("verify create quote", async ({ adminPage }) => {
    const person = new PersonsPage(adminPage);
    const quote = new QuotesPage(adminPage);
    await person.navigageToPersonsPage();
    await person.createPerson(quoteData.person);
    await quote.navigateToQuotesPage();
    await quote.createQuote(quoteData);

  })
  test('verify updated quote', async ({ adminPage }) => {
    const quote = new QuotesPage(adminPage);
    await quote.navigateToQuotesPage();
    await quote.searchInputExact.fill(quoteData.subject);
    await quote.updateQuote(quoteData);
  })
  test('verify delete quote', async ({ adminPage }) => {
    const quote = new QuotesPage(adminPage);
    await quote.navigateToQuotesPage();
    await quote.searchByName(quoteData.subject);
    await quote.deleteQuote();
  })

})