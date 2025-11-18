import { env } from "process";
import { test } from "../../fixtures/AdminFixtures";
import { eventdata, EventsPage } from "../../pages/settings/settings-pages/EventsPage";

test.describe('event management', () => {

 
 
  test('create event', async ({ adminPage }) => {
    const event = await new EventsPage(adminPage);
    await event.navigateToEvents();
    await event.createEvent(eventdata);
    await event.searchByName(eventdata.name);
    await event.deleteEvent();

  })
})