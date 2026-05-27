import { Page } from "@playwright/test";

export class inventoryPage {
 private page: Page
constructor (page: Page){
    this.page = page
}

 async addFirstItemtoCart (){
    await this.page.getByRole('button', {name: 'Add to cart'}).first().click()
 }
}
