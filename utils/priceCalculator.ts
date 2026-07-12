const tax_rate = 0.08

export function calculateTotal (prices: number []): number {
    return prices.reduce((sum: number, price: number) => sum + price, 0)

}

export function calculateTax (total: number []): number {
    return total * tax_rate
}

export function calculateGrandTotal (prices: number []): number {
    const total = calculateTotal(prices)
    const tax = calculateTax (total)
    return total + tax
}