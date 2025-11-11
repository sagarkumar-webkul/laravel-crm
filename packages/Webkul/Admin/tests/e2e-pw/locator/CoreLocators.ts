import { Locator, Page } from "playwright/test";
import { title } from "process";

export default class CoreLocators {
    readonly page: Page

    constructor(page:Page) {

        this.page = page;
    }

    async getSerachLocator(placeholder:string)
    {
        return  this.page.getByRole('textbox', { name: `${placeholder}`, exact: true })
    }

    
}