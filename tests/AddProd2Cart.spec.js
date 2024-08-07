import {test, expect} from "@playwright/test";
import {LandingPage} from "../Pages/LandingPage";
import {ProductDisplayPage} from "../Pages/PDP";
import {CartPage} from "../Pages/CartPage";


let page;
test.beforeAll(async ({browser}) =>{
    page = await browser.newPage();
    const landingPage = new LandingPage(page);
    await page.goto("https://www.demoblaze.com/");
    await expect(page).toHaveURL("https://www.demoblaze.com/");
    await landingPage.clickLoginBtn();
    await landingPage.inputUsername("Muhd");
    await landingPage.inputPassword("Password");
    await landingPage.clickLoginBtn2();
    await page.waitForTimeout(3000);
    await landingPage.verifyThatUserCanLoginWithValidDetails();

})

test.afterAll(async ()=>{
    
    const cartPage = new CartPage(page);
    await cartPage.clickLogOutBtn();
    await page.waitForTimeout(3000);
    await page.screenshot({path: "tests/Screenshots/Logout/"+"logOutConfirmation.png"})
    await page.close();
})

test("Add products to cart", async function (){
    const prodDisplayPage = new ProductDisplayPage(page);
    const cartPage = new CartPage(page);
    await prodDisplayPage.clickProd1();
    await prodDisplayPage.clickAdd2Cart();
    await page.waitForTimeout(2000);
    await prodDisplayPage.clickHomeBtn();
    await prodDisplayPage.clickProd2();
    await prodDisplayPage.clickAdd2Cart();
    await page.waitForTimeout(2000);
    await prodDisplayPage.clickCartBtn();
    await page.waitForTimeout(5000);
    await page.screenshot({path: "tests/Screenshots/CartPage/"+"cart.png"});
    await cartPage.clickDeleteBtn1();
    await page.waitForTimeout(5000);
    await cartPage.clickDeleteBtn2();
});

    
test("Verify the quantity of product in cart ", async function(){
    const cartPage = new CartPage(page);
    const prodDisplayPage = new ProductDisplayPage(page);
    const landingPage = new LandingPage(page);

    await landingPage.clickHomeBtn();
    await prodDisplayPage.clickProd1();
    await prodDisplayPage.clickAdd2Cart();
    await page.waitForTimeout(2000);
    await prodDisplayPage.clickHomeBtn();
    await prodDisplayPage.clickProd2();
    await prodDisplayPage.clickAdd2Cart();
    await page.waitForTimeout(2000);
    await prodDisplayPage.clickCartBtn();
    await page.waitForTimeout(5000);
    await cartPage.verifyTheNumOfProdInCart();
    await cartPage.clickDeleteBtn1();
    await page.waitForTimeout(5000);
    await cartPage.clickDeleteBtn2();
});

test("Verify that user can purchase product", async function(){
    const cartPage = new CartPage(page);
    const prodDisplayPage = new ProductDisplayPage(page);
    const landingPage = new LandingPage(page);

    await landingPage.clickHomeBtn();
    await prodDisplayPage.clickProd1();
    await prodDisplayPage.clickAdd2Cart();
    await page.waitForTimeout(2000);
    await prodDisplayPage.clickHomeBtn();
    await prodDisplayPage.clickProd2();
    await prodDisplayPage.clickAdd2Cart();
    await page.waitForTimeout(2000);
    await prodDisplayPage.clickCartBtn();
    await page.waitForTimeout(5000);
    await cartPage.clickPlaceOrderBtn();
    await cartPage.inputName("Muhd");
    await cartPage.inputCountry("Nigeria");
    await cartPage.inputCity("Lagos");
    await cartPage.inputCard("123456789");
    await cartPage.inputMonth("August");
    await cartPage.inputYear("2024");
    await cartPage.clickPurchaseBtn();
    await page.waitForTimeout(3000);
    await page.screenshot({path: "tests/Screenshots/CartPage/"+"successMsg.png"})
    await cartPage.verifySuccessMsg();
    await cartPage.clickOkBtn();
});

test("Verify that user cannot make purchase without inputting details", async function (){

    const cartPage = new CartPage(page);
    const prodDisplayPage = new ProductDisplayPage(page);

    await prodDisplayPage.clickCartBtn();
    await page.waitForTimeout(3000);
    await cartPage.clickPlaceOrderBtn();
    await page.waitForTimeout(3000);
    await cartPage.clickPurchaseBtn2();
    await page.waitForTimeout(3000);
    //this screenshot here can be quite confusing
    await page.screenshot({path: "tests/Screenshots/CartPage/"+"detailsform.png"})
    await cartPage.clickCloseBtn();
})
    


