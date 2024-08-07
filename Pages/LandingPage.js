import { expect } from "playwright/test";

class LandingPage {
constructor(page){
    this.page = page;
    this.loginBtn = "id=login2";
    this.username = "id=loginusername";
    this.password = "id=loginpassword"
    this.loginBtn2 = "//button[text() = 'Log in']";
    this.logOutBtn = "id=logout2";
    this.nameofuser = "id=nameofuser";
    this.homeBtn = "//a[text() = 'Home ']"
    this.contactBtn = "//a[text() = 'Contact']";
}


async clickLoginBtn(){
    await this.page.locator(this.loginBtn).click();
}

async inputUsername(username){
    await this.page.locator(this.username).fill(username);
}

async inputPassword(password){
    await this.page.locator(this.password).fill(password);
}

async clickLoginBtn2() {
    const dialogHandler = async dialog => {
        expect(dialog.type()).toBe("alert");
        expect(dialog.message()).toContain("User does not exist.");
        await dialog.accept();
    };

    await this.page.once("dialog", dialogHandler);
    await this.page.locator(this.loginBtn2).click();
    await this.page.waitForTimeout(1000); // Give some time for the dialog to be handled
    this.page.removeListener("dialog", dialogHandler); // Remove the listener
}


async verifyThatUserCanLoginWithValidDetails(){
    await expect(this.page.locator(this.nameofuser)).toBeVisible();
}

async clickHomeBtn(){
    await this.page.locator(this.homeBtn).click();
}

async clickContactBtn(){
    await this.page.locator(this.contactBtn).click();
}

}

module.exports = {LandingPage}