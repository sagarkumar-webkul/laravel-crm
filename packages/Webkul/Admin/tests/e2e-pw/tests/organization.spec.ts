import { test } from "../fixtures/AdminFixtures";
import OrganizationPage, { organizationData } from "../pages/organization/OrganizationPage";
import { OrganizationData } from "../pages/organization/OrganizationPage";

test.describe("organization mangement",async()=>{

    


    test("verify organization create",async({adminPage})=>{

        const organizationPage=new OrganizationPage(adminPage);
        
        await organizationPage.createOrganization(organizationData);
        

    })

    


    
})