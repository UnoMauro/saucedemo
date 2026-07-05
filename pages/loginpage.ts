import { BasePage } from "./BasePage";


export class LoginPage extends BasePage{


 async login (username: string, password: string){
await this.page.getByRole('textbox', {name: 'Username'}).fill(username)
await this.page.getByRole('textbox', {name: 'Password'}).fill(password)
await this.page.click('#login-button')

 }
}
