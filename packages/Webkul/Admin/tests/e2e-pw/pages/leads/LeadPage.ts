import { Page, Locator, expect } from "@playwright/test";
import CoreLocators from "../../locator/CoreLocators";
import { PersonData } from "../persons/PersonsPage";
export type LeadData = {
        title: string,
        description: string,
        email:string,
        phone: string,
        person:PersonData,
    };
export class LeadPage extends CoreLocators {
    readonly page: Page;

    // ---- Lead Creation Locators ----
    readonly titleInput: Locator;
    readonly descriptionTextarea: Locator;
    readonly sourceDropdown: Locator;
    readonly expectedCloseDate: Locator;
    readonly typeDropdown: Locator;
    readonly userDropdown: Locator;
    readonly leadValueInput: Locator;
    readonly addPersonButton: Locator;
    readonly personSearchInput: Locator;
    readonly addAsNewButton: Locator;
    readonly personEmailInput: Locator;
    readonly personPhoneInput: Locator;
    readonly addOrganizationButton: Locator;
    readonly organizationSearchInput: Locator;
    readonly saveLeadButton: Locator;

    // ---- Lead List Locators ----
    readonly leadSuccessToast: Locator;
    readonly listViewButton: Locator;
    readonly agreeButton: Locator;
    readonly editLeadButton:Locator;
    readonly deleteLeadButton:Locator;
    readonly listSearchInput:Locator;

    // ---- Lead Tabs Locators ----
    readonly mailButton: Locator;
    readonly fileButton: Locator;
    readonly noteButton: Locator;
    readonly activityButton: Locator;

    // ---- Mail Locators ----
    readonly mailToInput: Locator;
    readonly mailSubjectInput: Locator;
    readonly mailBodyTextarea: Locator;
    readonly sendMailButton: Locator;

    // ---- File Locators ----
    readonly fileTitleInput: Locator;
    readonly fileCommentTextarea: Locator;
    readonly fileNameInput: Locator;
    readonly uploadFileInput: Locator;
    readonly saveFileButton: Locator;

    // ---- Note Locators ----
    readonly noteCommentTextarea: Locator;
    readonly saveNoteButton: Locator;

    // ---- Activity Locators ----
    readonly addActivityTitleInput: Locator;
    readonly addActivityCommentTextarea: Locator;
    readonly scheduleFromInput: Locator;
    readonly scheduleToInput: Locator;
    readonly locationInput: Locator;
    readonly saveActivityButton: Locator;
    readonly createLeadButton: Locator;
    readonly searchInput: Locator;
    // ------ Validation Message
    readonly expectedCloseDateMustBeDateAfter:Locator



    constructor(page: Page) {
        super(page);
        this.page = page;

        // Lead create button

        this.createLeadButton = page.getByRole('link', { name: 'Create Lead' });

        // Lead form
        this.titleInput = page.getByRole('textbox', { name: 'Title *' });
        this.descriptionTextarea = page.locator('textarea[name="description"]');
        this.sourceDropdown = page.locator('select[name="lead_source_id"]');
        this.expectedCloseDate = page.locator('input[name="expected_close_date"]');
        this.typeDropdown = page.locator('select[name="lead_type_id"]');
        this.userDropdown = page.locator('select[name="user_id"]');
        this.leadValueInput = page.locator('input[name="lead_value"]');
        this.searchInput = page.getByRole('textbox', { name: 'Search by Title' });
        this.listSearchInput=page.getByRole('textbox',{name:'Search'})

        // Add person
        this.addPersonButton = page.locator('div', { hasText: /^Click to Add$/ }).nth(1);
        this.personSearchInput = page.getByRole('textbox', { name: 'Search...' });
        this.addAsNewButton = page.getByText('Add as New');
        this.personEmailInput = page.locator('input[name="person[emails][0][value]"]');
        this.personPhoneInput = page.locator('input[name="person[contact_numbers][0][value]"]');

        // Add organization
        this.addOrganizationButton = page.locator('div', { hasText: /^Click to add$/ }).nth(2);
        this.organizationSearchInput = page.getByRole('textbox', { name: 'Search...' });
        this.saveLeadButton = page.getByRole('button', { name: 'Save' });

        // General

        this.leadSuccessToast = page.getByText('Success', { exact: true });
        this.editLeadButton = page.getByRole('link', { name: '' }).first();
        this.listViewButton = page.getByRole('link', { name: '' });
        this.agreeButton = page.getByRole('button', { name: 'Agree', exact: true });
        this.deleteLeadButton= page.locator('.cursor-pointer.rounded-md.p-1\\.5.text-2xl.transition-all.hover\\:bg-gray-200.dark\\:hover\\:bg-gray-800.max-sm\\:place-self-center.icon-delete').first();


        // Tabs
        this.mailButton = page.getByRole('button', { name: ' Mail' });
        this.fileButton = page.getByRole('button', { name: ' File' });
        this.noteButton = page.getByRole('button', { name: ' Note' });
        this.activityButton = page.getByRole('button', { name: ' Activity' });

        // Mail
        this.mailToInput = page.locator('input[name="temp-reply_to"]');
        this.mailSubjectInput = page.locator('input[name="subject"]');
        this.mailBodyTextarea = page.locator('textarea[name="reply"]');
        this.sendMailButton = page.getByRole('button', { name: 'Send' });

        // File
        this.fileTitleInput = page.locator('input[name="title"]');
        this.fileCommentTextarea = page.locator('textarea[name="comment"]');
        this.fileNameInput = page.locator('input[name="name"]');
        this.uploadFileInput = page.locator('#file');
        this.saveFileButton = page.getByRole('button', { name: 'Save File' });

        // Note
        this.noteCommentTextarea = page.locator('textarea[name="comment"]');
        this.saveNoteButton = page.getByRole('button', { name: 'Save Note' });

        // Activity
        this.addActivityTitleInput = page.locator('input[name="title"]');
        this.addActivityCommentTextarea = page.locator('textarea[name="comment"]');
        this.scheduleFromInput = page.locator('input[name="schedule_from"]');
        this.scheduleToInput = page.locator('input[name="schedule_to"]');
        this.locationInput = page.locator('input[name="location"]');
        this.saveActivityButton = page.getByRole('button', { name: 'Save Activity' });

        // validation message

        this.expectedCloseDateMustBeDateAfter=page.getByText('The expected close date must be a date after');
    }
    async navigateToLeadList() {
        await this.page.goto("admin/leads");
    }
    async getLeadByTitle(title:string)
    {
        return this.page.getByRole('link', { name: ` ${title}` });
    }
    async createLead(leadData:LeadData)
    {

        await this.navigateToLeadList();

        await this.createLeadButton.click();

        await this.titleInput.fill(leadData.title);
        await this.descriptionTextarea.fill(leadData.description);
        await this.sourceDropdown.selectOption("1");
        await this.typeDropdown.selectOption("1");
        await this.userDropdown.selectOption("1");
        await this.leadValueInput.fill("1000");

        await this.addPersonButton.click();
        await this.personSearchInput.fill(leadData.person.name);
        await this.selectListItmeByName(leadData.person.name);
        await this.personEmailInput.fill(leadData.email);
        await this.personPhoneInput.fill(leadData.phone);

        await this.addOrganizationButton.click();
        await this.organizationSearchInput.fill(leadData.title);
        await this.addAsNewButton.click();



        (await this.getElementByTypeAndName('button',"Save")).click();
        await this.searchInput.fill(leadData.title);
        await this.page.keyboard.press('Enter');
        await expect((await this.getLeadByTitle(leadData.title))).toBeVisible();

       
        await expect(this.leadSuccessToast).toBeVisible();

    }


}
