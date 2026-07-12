//Note para PR//
import {calculateTotal, calculateTax, calculateGrandTotal} from '../utils/priceCalculator'
import {test, expect} from '@playwright/test'


test(('calculateTotal suma total'), () => {
    expect(calculateTotal([29.99,9.99,15.99])).toBe(55.97)

})


test(('calculateTax regresa 8%'), () => {
    expect(calculateTax(100)).toBe(8)

})

test(('calculateTotal suma con tax'), () => {
    expect(CalculateGrandTotal([29.99,9.99,15.99])).toBeCloseTo(60.45,1)

})