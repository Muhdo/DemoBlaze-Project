import { expect } from "playwright/test";

class ContactPage {
    constructor(page){
        this.page = page;
        this.email = "id=recipient-email";
        this.name = "id=recipient-name";
        this.message = "id=message-text";
        this.sendMessageBtn = "//button[text() = 'Send message']";

    }

    async inputEmail(email){
        await this.page.locator(this.email).fill(email);
    }

    async inputName(name){
        await this.page.locator(this.name).fill(name);
    }

    async inputMessage(message){
        await this.page.locator(this.message).fill(message);
    }

    async clickSendMsgBtn(){
        await this.page.once("dialog", async dialog=>{
            expect(dialog.type()).toBe("alert");
            expect(dialog.message()).toContain("Thanks for the message!!");
            await dialog.accept();
        })

        await this.page.locator(this.sendMessageBtn).click();
    }
}
module.exports = {ContactPage};