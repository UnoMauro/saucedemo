import {test, expect} from "@playwright/test"
import { LoginPage } from "../pages/loginpage"
import {calculateTotal, calculateTax, calculateGrandTotal} from '../utils/priceCalculator'



test ("Cart total match", async ({page}) =>  {
    const loginpage = new LoginPage (page)
    await loginpage.goto ()
    await loginpage.login('standard_user','secret_sauce')
    
    //Agrega 5 items
    const addButtons = await page.getByRole('button', {name: "Add to cart"})
    const count = await addButtons.count()
    for (let i = 0; i < count; i++)
    {
        await addButtons.first().click()
    }
    
    //Ir a carrito
    await page.locator('.shopping_cart_link').click()
    await page.waitForURL('**/cart.html')


    //Traer precio
    const priceTexts = await page.locator('.inventory_item_price').allTextContents()
    const prices = priceTexts.map (p => parseFloat(p.replace('$','')))
   
    //calcular total
    const expectedTotal = calculateGrandTotal (prices)

   //checkout validacion
   await page.locator('#checkout').click()
   await page.waitForURL('**/checkout-step-one.html')
   await page.locator('#first-name').fill('Lionel')
   await page.locator('#last-name').fill('Messi')
   await page.locator('#postal-code').fill('55555')
   await page.locator('#continue').click()



   await page.waitForURL('**/checkout-step-two.html')
   const totalText = await page.locator('.summary_total_label').textContent()
   const taxText =  await page.locator('.summary_tax_label').textContent()
   const itemTotalText =  await page.locator('.summary_subtotal_label').textContent()
   const actualtotal = parseFloat(totalText?.replace('Total: $','') || '0')
   const tax =  parseFloat(taxText?.replace('Tax: $','') || '0')
   const itemTotal =  parseFloat(itemTotalText?.replace('Item total: $','') || '0')
   expect (actualtotal).toBeCloseTo (expectedTotal, 2)
   expect (tax).toBeCloseTo(calculateTax(itemTotal),2)

})