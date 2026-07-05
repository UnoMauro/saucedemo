import {test, expect} from "@playwright/test"
import { LoginPage } from "../pages/loginpage"
import { inventoryPage } from "../pages/inventory"
import { checkout } from "../pages/checkoutE2E"
import { componentecart } from "../pages/componentecart"

test ("Successful login", async ({page}) =>  {
    const loginpage = new LoginPage (page)
    await loginpage.goto ()
    await loginpage.login('standard_user','secret_sauce')
    await expect (page).toHaveURL ('https://www.saucedemo.com/inventory.html')
})


test ("failed login", async ({page}) =>  {
    const loginpage = new LoginPage (page)
    await loginpage.goto ()
    await loginpage.login('wrong','test123')
    await expect (page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible()
})

test ("Add item ", async ({page}) =>  {
    const loginpage = new LoginPage (page)
    const inventory = new inventoryPage (page)
    await loginpage.goto ()
    await loginpage.login('standard_user','secret_sauce')
    await inventory.addFirstItemtoCart()
    await expect(page.getByRole('link', {name: /1/})).toBeVisible
})


test ("Item added ", async ({page}) =>  {
    const loginpage = new LoginPage (page)
    const inventory = new inventoryPage (page)
    await loginpage.goto ()
    await loginpage.login('standard_user','secret_sauce')
    await inventory.addFirstItemtoCart()
    await page.locator('.shopping_cart_link').click()
    await expect(page.getByRole('button', {name:'Remove'})).toBeVisible()
})


test ("Cart has item", async ({page}) =>  {
    const loginpage = new LoginPage (page)
    const inventory = new inventoryPage (page)
    const cart = new componentecart (page)
    await loginpage.goto ()
    await loginpage.login('standard_user','secret_sauce')
    await inventory.addFirstItemtoCart()
    expect (await cart.getCartCount()).toBe('1')
})


test ("logout", async ({page}) =>  {
    const loginpage = new LoginPage (page)
    await loginpage.goto ()
    await loginpage.login('standard_user','secret_sauce')
    await page.locator('#react-burger-menu-btn').click()
    await page.getByRole('link', {name: 'Logout' }).click()
    await expect (page).toHaveURL ('https://www.saucedemo.com/')

})


test ('Complete E2E', async ({page}) => {
     const loginpage = new LoginPage (page)
     const inventory = new inventoryPage (page)
     const checkoutE2E = new checkout (page)
    await loginpage.goto ()
    await loginpage.login('standard_user','secret_sauce')
    await inventory.SelectProduct('Test.allTheThings() T-Shirt (Red)')
    await inventory.PDP ()
    await checkoutE2E.goCart ()
    await checkoutE2E.CheckoutPage ()
    console.log ("Bandera")
    await checkoutE2E.FillForm('Mauro1', 'Mauro2', 'Mauro3')
    await checkoutE2E.CheckoutContinue ()
    await checkoutE2E.CheckoutFinish ()
    await expect (page).toHaveURL ('/checkout-complete.html')

})