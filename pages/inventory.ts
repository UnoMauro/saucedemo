import { Page } from "@playwright/test";

export class inventoryPage {
 private page: Page
constructor (page: Page){
    this.page = page
}

 async addFirstItemtoCart (){
    await this.page.getByRole('button', {name: 'Add to cart'}).first().click()
 }

 async SelectProduct (productName: string){
    await this.page.getByText(productName).first().click()
 }


async PDP (){
await this.page.getByRole('button', {name: 'Add to cart'}).first().click()
}
}

