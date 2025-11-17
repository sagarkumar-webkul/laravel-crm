import { test } from "../../fixtures/AdminFixtures";
import { eventdata, EventsPage } from "../../pages/settings/settings-pages/EventsPage";

test.describe('event management', () => {

    test('create event', async ({ adminPage }) => {
        const event = new EventsPage(adminPage);
       await  event.gotoEventsPage()
        await event.openCreateEventModal()
      await   event.createEvent(eventdata);


    })
})