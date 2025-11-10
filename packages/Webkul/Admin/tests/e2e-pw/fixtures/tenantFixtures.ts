import { test as base, expect, type Page } from "@playwright/test";
import fs from "fs";
import { TenantPage as Tenant } from "../pages/tenant/TenantPage";
import { TENANT_AUTH_STATE_PATH, TENANT_BASE_URL } from "../playwright.config";

interface TenantTestPage extends Page {
    fillInTinymce: (iframeSelector: string, content: string) => Promise<void>;
}

type TenantFixtures = {
    tenantPage: TenantTestPage;
};

export const test = base.extend<TenantFixtures>({
    tenantPage: async ({ browser }, use) => {
        const authExists = fs.existsSync(TENANT_AUTH_STATE_PATH);

        // Always create a fresh context for tenant with base URL
        const context = await browser.newContext({
            baseURL: TENANT_BASE_URL,
            storageState: authExists ? TENANT_AUTH_STATE_PATH : undefined,
        });

        const page = await context.newPage();
        const tenant = new Tenant(page);

        if (!authExists) {
            console.log("⚙️  Logging into tenant for first time...");
            await tenant.tenantLogin("sagar@example.com", "admin123");
            await context.storageState({ path: TENANT_AUTH_STATE_PATH });
        } else {
            // Validate we're still in tenant context, not super admin
            await page.goto(`${TENANT_BASE_URL}/admin/dashboard`);
        }

        // 🧠 Safety net: if somehow redirected to super admin
        if (page.url().includes(`${TENANT_BASE_URL}/admin/login`) || page.url().includes("/admin/login")) {
                     await tenant.tenantLogin('sagar@example.com', 'admin123');
                       /**
                        * Save authentication state to a file.
                        */
                       await context.storageState({ path: TENANT_AUTH_STATE_PATH });
        }

        // 🧩 Add TinyMCE helper (reusable)
        (page as TenantTestPage).fillInTinymce = async function (iframeSelector: string, content: string) {
            await page.waitForSelector(iframeSelector);
            const iframe = page.frameLocator(iframeSelector);
            const editorBody = iframe.locator("body");
            await editorBody.click();
            await editorBody.press("Control+a");
            await editorBody.press("Backspace");
            await editorBody.pressSequentially(content);
            await expect(editorBody).toHaveText(content);
        };

        // ✅ Provide the extended page to tests
        await use(page as TenantTestPage);

        await context.close();
    },
});

export { expect };
