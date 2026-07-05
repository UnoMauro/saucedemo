import { BasePage } from "./BasePage";


export class inventoryPage extends BasePage{

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

