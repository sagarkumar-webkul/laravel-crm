import { test } from "../fixtures/AdminFixtures";
import PersonsPage, { personData } from "../pages/PersonsPage";


test.describe("person managment", async () => {
    test("verify create person", async ({ adminPage }) => {
        const personPage = new PersonsPage(adminPage);
        await personPage.page.goto("admin/contacts/persons");

        await personPage.createPerson(personData);


    })


})

