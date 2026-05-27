import {test, expect} from "@playwright/test"
import { LoginPage } from "../pages/loginpage"
import { inventoryPage } from "../pages/inventory"

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

test ("logout", async ({page}) =>  {
    const loginpage = new LoginPage (page)
    await loginpage.goto ()
    await loginpage.login('standard_user','secret_sauce')
    await page.locator('#react-burger-menu-btn').click()
    await page.getByRole('link', {name: 'Logout' }).click()
    await expect (page).toHaveURL ('https://www.saucedemo.com/')

})