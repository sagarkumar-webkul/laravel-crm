import { Locator, Page } from "playwright/test";

export default class CoreLocators {
    readonly page: Page
    readonly searchInput:Locator
    constructor(page:Page) {

        this.page= page,
        this.searchInput = page.locator('input[name="search"]');
    }
    
}