import { BasePage } from "./BasePage";


export class checkout extends BasePage {

async goCart(){
    await this.page.locator ('#shopping_cart_container').click()
}

async CheckoutPage (){
    await this.page.getByRole('button', {name: 'Checkout'}).click()
}


async FillForm (FirstName: string, LastName: string, Zip: string){
    await this.page.locator ('#first-name').fill(FirstName)
    await this.page.locator ('#last-name').fill(LastName)
    await this.page.locator ('#postal-code').fill(Zip)
}

async CheckoutContinue (){
    await this.page.getByRole('button', {name: 'Continue'}).click()
}


async CheckoutFinish (){
    await this.page.getByRole('button', {name: 'Finish'}).click()
}



 }
