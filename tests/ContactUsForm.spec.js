import {test, expect} from "@playwright/test";
import {LandingPage} from "../Pages/LandingPage";
import {ContactPage} from "../Pages/ContactPage";

let page;

test.beforeAll(async ({browser})=>{
  page = await browser.newPage();
  await page.goto("https://www.demoblaze.com/");

})


test("Verify that user can fill contact form", async function (){
    const landingPage = new LandingPage(page);
    const contactPage = new ContactPage(page);
    
    await landingPage.clickLoginBtn();
    await landingPage.inputUsername("Muhd");
    await landingPage.inputPassword("Password");
    await landingPage.clickLoginBtn2();
    await page.waitForTimeout(3000);
    await landingPage.clickContactBtn();
    await contactPage.inputEmail("Muhd@test.com");
    await contactPage.inputName("Muhd");
    await contactPage.inputMessage("Test Automation");
    await contactPage.clickSendMsgBtn();

})