import {test, expect} from "@playwright/test";

class ProductDisplayPage {

    constructor(page){
        this.page = page;
        this.prod1 = "//a[text() = 'Samsung galaxy s6']";
        this.add2Cart = "//a[text() = 'Add to cart']";
        this.homeBtn = "//span[@class = 'sr-only']";
        this.prod2 = "//a[text() = 'Nokia lumia 1520']"
        this.cartBtn = "id=cartur";

    }

    async clickProd1(){
        await this.page.locator(this.prod1).click();
    }

    async clickAdd2Cart(){
        await this.page.once("dialog", async dialog=>{
            expect(dialog.type()).toBe("alert");
            expect(dialog.message()).toContain("Product added.")
            await dialog.accept();
        })
        await this.page.locator(this.add2Cart).click();
        //await this.page.waitForTimeout(3000);
    }

    async clickHomeBtn(){
        await this.page.locator(this.homeBtn).click();
    }

    async clickProd2(){
        await this.page.locator(this.prod2).click();
    }

    async clickCartBtn(){
        await this.page.locator(this.cartBtn).click();
    }
}
module.exports = {ProductDisplayPage}