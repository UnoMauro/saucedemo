import { Page } from "@playwright/test";
export class LoginPage {
 private page: Page
constructor (page: Page){
    this.page = page

}
 async goto(){
    await this.page.goto('/')
 }
 async login (username: string, password: string){
await this.page.getByRole('textbox', {name: 'Username'}).fill(username)
await this.page.getByRole('textbox', {name: 'Password'}).fill(password)
await this.page.click('#login-button')

 }

}