import { Page } from "playwright/test";
import { SettingsPage } from "../SettingsPage";

export class SourcesPage extends SettingsPage {
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async open() {
        await this.page.goto("admin/settings/sources");
    }
}
