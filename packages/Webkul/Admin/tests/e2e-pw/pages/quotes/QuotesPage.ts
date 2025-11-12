import { Locator, Page } from "@playwright/test";
import CoreLocators from "../../locator/CoreLocators";
export type QuoteData = {
  subject: string;
  description: string;
  salesOwnerId: string;
  expiredAt: string; // expiration date string
  personName: string;
  leadName: string;
  // Add quote items type here if needed
};

export type Address = {
  address: string;
  countryCode: string; // e.g. 'IN'
  stateCode: string;   // e.g. 'DL'
  city: string;
  postcode: string;
};


export class QuotesPage extends CoreLocators {
    readonly page: Page;

    // Navigation links/buttons
    readonly createQuoteLink: Locator;
    readonly saveQuoteButton: Locator;

    // Form fields
    readonly subjectTextbox: Locator;
    readonly descriptionTextbox: Locator;
    readonly salesOwnerSelect: Locator;
    readonly expiredAtTextbox: Locator;

    // Person search and selection
    readonly searchTextbox: Locator;

    // Billing address fields
    readonly billingAddressTextarea: Locator;
    readonly billingCountrySelect: Locator;
    readonly billingStateSelect: Locator;
    readonly billingCityInput: Locator;
    readonly billingPostcodeInput: Locator;

    // Shipping address fields
    readonly shippingAddressTextarea: Locator;
    readonly shippingCountrySelect: Locator;
    readonly shippingStateSelect: Locator;
    readonly shippingCityInput: Locator;
    readonly shippingPostcodeInput: Locator;

    // Confirmation/Sucess notification locator

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.subjectTextbox = page.getByRole("textbox", { name: "Subject *" });
        this.descriptionTextbox = page.getByRole("textbox", { name: "Description" });
        this.searchTextbox = page.getByRole("textbox", { name: "Search..." });

        this.expiredAtTextbox = page.getByRole("textbox", { name: "Expired At *" });

        this.billingAddressTextarea = page.locator('textarea[name="billing_address\\[address\\]"]');
        this.shippingAddressTextarea = page.locator('textarea[name="shipping_address\\[address\\]"]');

        this.billingCityInput = page.locator('input[name="billing_address\\[city\\]"]');
        this.billingPostcodeInput = page.locator('input[name="billing_address\\[postcode\\]"]');
        this.shippingCityInput = page.locator('input[name="shipping_address\\[city\\]"]');
        this.shippingPostcodeInput = page.locator('input[name="shipping_address\\[postcode\\]"]');

        this.salesOwnerSelect = page.getByLabel("Sales Owner");
        this.billingCountrySelect = page.locator('select[name="billing_address\\[country\\]"]');
        this.billingStateSelect = page.locator('select[name="billing_address\\[state\\]"]');
        this.shippingCountrySelect = page.locator('select[name="shipping_address\\[country\\]"]');
        this.shippingStateSelect = page.locator('select[name="shipping_address\\[state\\]"]');

        this.saveQuoteButton = page.getByRole("button", { name: "Save Quote" });

        this.createQuoteLink = page.getByRole("link", { name: "Create Quote" });


        this.createQuoteLink = page.getByRole("link", { name: "Create Quote" });


    }
    async navigateToQuotesPage()
    {
        await this.page.goto("admin/quotes");
    }

    async createQuote(quoteData:QuoteData,address:Address)
    {

        await this.navigateToQuotesPage();
        // Fill Quote Basics
        this.createQuoteLink.click();
  await this.subjectTextbox.fill(quoteData.subject);
  await this.descriptionTextbox.fill(quoteData.description);
  await this.salesOwnerSelect.selectOption(quoteData.salesOwnerId);
  await this.expiredAtTextbox.fill(quoteData.expiredAt);

  // Link to Person - Click to add and select person by name
  await this.personOrgSelectDiv.click();
  await this.searchTextbox.fill(quoteData.personName);
  (await this.selectListItmeByName(quoteData.personName)).click(); // or select existing if applicable

  // Link to Lead - Click to add and select lead by name
  await this.page.locator('div').filter({ hasText: /^Click to add$/ }).nth(2).click();
  await this.searchTextbox.fill(quoteData.leadName);
  await this.page.getByText('Add as New').click(); // or select existing

  // Fill Billing Address
  await this.page('textarea[name="billing_address\\[address\\]"]').fill(address.address);
  await this.billingCountrySelect.selectOption(address.countryCode);
  await this.billingStateSelect.selectOption(address.stateCode);
  await this.billingCityInput.fill(address.city);
  await this.billingPostcodeInput.fill(address.postcode);

  // Fill Shipping Address
  await this.page.locator('textarea[name="shipping_address\\[address\\]"]').fill(address.address);
  await this.shippingCountrySelect.selectOption(address.countryCode);
  await this.shippingStateSelect.selectOption(address.stateCode);
  await this.shippingCityInput.fill(address.city);
  await this.shippingPostcodeInput.fill(address.postcode);

  // TODO: Add quote items filling logic here as per your application structure

  // Save the quote
  await this.saveQuoteButton.click();

    }
}
