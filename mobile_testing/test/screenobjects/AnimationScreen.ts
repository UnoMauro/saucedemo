class AnimationScreen {
 get viewFlipItem() {
   return $('~View Flip')
 }
 get flipButton() {
   return $('~Flip')
 }
 get frenchListItem() {
   return $('//android.widget.TextView[@text="Un"]')
 }
 async openViewFlip() {
   await this.viewFlipItem.waitForDisplayed({ timeout: 10000 })
   await this.viewFlipItem.click()
 }
 async flipList() {
   await this.flipButton.waitForDisplayed({ timeout: 10000 })
   await this.flipButton.click()
 }
 async isFrenchListVisible() {
   await this.frenchListItem.waitForDisplayed({ timeout: 10000 })
   return await this.frenchListItem.isDisplayed()
 }
}
export default new AnimationScreen()