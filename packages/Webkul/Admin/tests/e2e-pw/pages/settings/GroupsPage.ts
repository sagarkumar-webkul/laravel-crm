// groupPage.js
import { expect, Locator, Page } from '@playwright/test';
import { SettingsPage } from '../SettingsPage';

export type GroupData={
    name:string,
    description:string
}

export class GroupPage extends SettingsPage {
    readonly page:Page;
    readonly createGroupButton: Locator;
    readonly saveGroupButton: Locator;
    readonly nameInput: Locator;
    readonly descriptionTextarea: Locator;
    readonly successMessage: Locator;

    constructor(page:Page) {
        super(page);
        this.page = page;
        
        // Buttons
        this.createGroupButton = page.getByRole("button", { name: "Create group" });
        this.saveGroupButton = page.getByRole("button", { name: "Save Group" });
        
        // Form fields
        this.nameInput = page.locator('input[name="name"]');
        this.descriptionTextarea = page.locator('textarea[name="description"]');
        
        // Notifications
        this.successMessage = page.getByText("Group created successfully.");
    }
    async createGroup(groupData:GroupData)
    {
        await this.createGroupButton.click();
        await this.nameInput.fill(groupData.name);
        await this.descriptionTextarea.fill(groupData.description);
        await expect(this.successMessage.first()).toBeVisible();
    }
}
