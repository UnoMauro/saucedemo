class AccessibilityScreen {
 get nodeProvider() {
   return $('//android.widget.TextView[@text="Accessibility Node Provider"]')
 }
 async waitForDisplay() {
   await this.nodeProvider.waitForDisplayed({ timeout: 10000 })
 }
 async isNodeProviderVisible() {
   return await this.nodeProvider.isDisplayed()
 }
}
export default new AccessibilityScreen()