import { Page } from "playwright/test";
import { SettingsPage } from "../SettingsPage";

export class TagsPage extends SettingsPage {
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

 
}
