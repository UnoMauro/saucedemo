import { expect } from '@wdio/globals'
import MainScreen from '../screenobjects/MainScreen'
import AccessibilityScreen from '../screenobjects/AccessibilityScreen'
import AnimationScreen from '../screenobjects/AnimationScreen'

describe('ApiDemos App', () => {

    beforeEach(async () => {
 await browser.activateApp('io.appium.android.apis', '.ApiDemos')
})



 it('should open the app and see the main menu', async () => {
   await MainScreen.waitForDisplay()
   expect (await MainScreen.accessibilityItem.isDisplayed()).toBe(true)
 })

 it('should open Accessibility and show submenu', async () => {
   await MainScreen.waitForDisplay()
   await MainScreen.openAccessibility()
   expect(await AccessibilityScreen.isNodeProviderVisible()).toBe(true)
 })

it('should flip animation list from English to French', async () => {
 await MainScreen.waitForDisplay()
 await MainScreen.openAnimation()
 await AnimationScreen.openViewFlip()
 await AnimationScreen.flipList()
 expect(await AnimationScreen.isFrenchListVisible()).toBe(true)
})
})