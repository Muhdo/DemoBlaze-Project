import {test, expect} from "@playwright/test";
import {LandingPage} from "../Pages/LandingPage";


let page;

test.beforeEach(async ({browser})=>{
    page = await browser.newPage();
    await page.goto("https://www.demoblaze.com/");
})

test("Validate that user can access the website", async function(){    
    await expect(page).toHaveURL("https://www.demoblaze.com/");
    await expect(page).toHaveTitle("STORE");
    await page.waitForTimeout(5000);

});

test("Validate that user can login with valid credentials", async function(){

    const landingPage = new LandingPage(page);
   await landingPage.clickLoginBtn();
   await landingPage.inputUsername("Muhd");
   await landingPage.inputPassword("Password");
   await landingPage.clickLoginBtn2();
   await page.waitForTimeout(3000);
   await page.screenshot({path: "tests/Screenshots/Login/"+"ValidLogin.png", fullPage: true})
   await landingPage.verifyThatUserCanLoginWithValidDetails();
   
});

test("Validate that user cannot login with invalid details", async function(){
    const landingPage = new LandingPage(page);
    await landingPage.clickLoginBtn();
   await landingPage.inputUsername("Moh");
   await landingPage.inputPassword("Password");
   await landingPage.clickLoginBtn2();
   await page.waitForTimeout(3000);
   await page.screenshot({path: "tests/Screenshots/Login/"+"InvalidLogin.png"})
})

