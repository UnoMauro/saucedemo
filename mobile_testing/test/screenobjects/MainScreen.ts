class MainScreen {
 get accessibilityItem() {
   return $('~Accessibility')
 }
 get animationItem() {
   return $('~Animation')
 }
 async waitForDisplay() {
   await this.accessibilityItem.waitForDisplayed({ timeout: 10000 })
 }
 async openAccessibility() {
   await this.accessibilityItem.click()
 }
 async openAnimation() {
   await this.animationItem.click()
 }
}
export default new MainScreen()