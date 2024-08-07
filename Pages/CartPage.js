import {test, expect} from "@playwright/test";

class CartPage{
    constructor(page){
        this.page = page;
        this.numOfProds = "//tr[@class = 'success']";
        this.placeOrder = "//button[text() = 'Place Order']";
        this.name = "id=name";
        this.country = "id=country";
        this.city = "id=city";
        this.card = "id=card";
        this.month = "id=month";
        this.year = "id=year";
        this.purchaseBtn = "//button[text() = 'Purchase']";
        this.thankYou = "//h2[text() = 'Thank you for your purchase!']";
        this.okBtn = "//button[text() = 'OK']";
        this.deleteBtn1 = "(//td/a[text() = 'Delete'])[1]";
        this.deleteBtn2 = "//td/a[text() = 'Delete']"; 
        this.closeBtn = "(//button[text() = 'Close'])[3]";
        this.logoutBtn = "id=logout2";     
    }

    async verifyTheNumOfProdInCart(){
        const prodNum = await this.page.$$(this.numOfProds);
        expect(prodNum).toHaveLength(2);
    }

    async clickPlaceOrderBtn(){
        await this.page.locator(this.placeOrder).click();
    }

    async inputName(name){
        await this.page.locator(this.name).fill(name)
    }

    async inputCountry(country){
        await this.page.locator(this.country).fill(country)
    }

    async inputCity(city){
        await this.page.locator(this.city).fill(city)
    }

    async inputCard(card){
        await this.page.locator(this.card).fill(card)
    }

    async inputMonth(month){
        await this.page.locator(this.month).fill(month)
    }

    async inputYear(year){
        await this.page.locator(this.year).fill(year)
    }

    async clickPurchaseBtn(){
        await this.page.locator(this.purchaseBtn).click();
    }

    async clickPurchaseBtn2(){
        await this.page.once( "dialog", async dialog=>{
            expect(dialog.type()).toBe("alert");
            expect(dialog.message()).toContain("Please fill out Name and Creditcard.")
            await dialog.accept();
    
        })
    
        await this.page.locator(this.purchaseBtn).click();
    }

    async verifySuccessMsg(){
        expect(await this.page.locator(this.thankYou)).toContainText("Thank you for your purchase!")
        expect(await this.page.locator(this.thankYou)).toBeVisible();
    }

    async clickOkBtn(){
        await this.page.locator(this.okBtn).click();
    }

    async clickDeleteBtn1(){
        await this.page.locator(this.deleteBtn1).click();
    }

    async clickDeleteBtn2(){
        await this.page.locator(this.deleteBtn2).click();
    }

    async clickCloseBtn(){
        await this.page.locator(this.closeBtn).click();
    }

    async clickLogOutBtn(){
        await this.page.locator(this.logoutBtn).click();
    }
}
module.exports = {CartPage};