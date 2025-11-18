import { test } from "../../fixtures/AdminFixtures";
import { AdminPage } from "../../pages/AdminPage";
import { campaignData, CampaignsPage } from "../../pages/settings/settings-pages/CampaignsPage";
import {  EventsPage } from "../../pages/settings/settings-pages/EventsPage";

test.describe('campaign management ',()=>{


    test('create evenet before campaign to assign event to campaign',async({adminPage})=>{
        const event=await new EventsPage(adminPage);
          await  event.navigateToEvents();
          await  event.createEvent(campaignData.event);

    })


    test('campaing create',async({adminPage})=>{
        const campaign=new CampaignsPage(adminPage);

      await   campaign.navigateToCampaigns();

      await  campaign.createCampaign(campaignData);
      await campaign.searchByName(campaignData.name);
        campaignData.name="updated name";
      await campaign.editCampaign(campaignData);
      await campaign.searchByName(campaignData.name);
      await campaign.deleteCampaign();


    })
})