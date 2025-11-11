import { Page, Locator, expect } from "@playwright/test";

export class LeadPage {
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
    readonly deleteButton: Locator;
    readonly agreeButton: Locator;
    readonly editLeadButton:Locator;

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
        this.deleteButton = page.getByRole('link', { name: '' });
        this.agreeButton = page.getByRole('button', { name: 'Agree', exact: true });


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
    async getPersonInput(personName:string)
    {
        return this.page.locator('div').filter({ hasText: `/^${personName}$/` }).nth(1)

    }
  

}
