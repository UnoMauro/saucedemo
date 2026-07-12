import { Page } from '@playwright/test'
 
export class CartComponent {

  protected page: Page
 
  constructor(page: Page) {

    this.page = page

  }
 
  async getCartCount(): Promise<string> {

    return await this.page.locator('.shopping_cart_badge').textContent() || '0'

  }
 
  async openCart() {

    await this.page.locator('.shopping_cart_link').click()

  }
 
  async isCartEmpty(): Promise<boolean> {

    const badge = await this.page.locator('.shopping_cart_badge').count()

    return badge === 0

  }

}
 