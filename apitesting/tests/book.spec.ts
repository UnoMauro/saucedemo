import {test, expect } from '@playwright/test'
import { z } from 'zod'
import bookings from '../fixtures/bookings.json' 

//This is a test, this will create a PR//



test ('POST /auth - get token', async ({ request })  => { //Login correcto
    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
        data: {
            "username" : "admin",
            "password" : "password123"
        },
        headers:{
            'Content-type': 'application/json'
        }

})

expect (response.status()).toBe(200)
const body = await response.json()
expect(body.token).toBeTruthy()
console.log('Token', body.token)
})

test ('POST /auth - invalid credential token', async ({ request })  => { //Login incorrecto
    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
        data: {
            "username" : "admin",
            "password" : "testing"
        },
        headers:{
            'Content-type': 'application/json'
        }

})

expect (response.status()).toBe(200)
const body = await response.json()
expect(body.reason).toBe('Bad credentials')
})




test ('GET /auth - list', async ({ request })  => { //GET Data
    const response = await request.get('https://restful-booker.herokuapp.com/booking')
    expect (response.status()).toBe(200)
    const body = await response.json()
    expect(body.length).toBeGreaterThan(0)
    console.log('Total Bookings : ', body.length)
    console.log("First booking:", JSON.stringify(body[0]))
})



test ('POST /booking - create booking', async ({ request })  => { //Ingresar Data 
    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: {
            firstname : "Mauricio",
            lastname : "Morales",
            totalprice : 450,
            depositpaid : true,
            bookingdates: {
                checkin: "2026-06-10",
                checkout: "2026-10-10"
            }, 

            additionalneeds: "Lunch"

            
        },
        headers:{
            'Content-type': 'application/json'
        }
})

expect (response.status()).toBe(200)
const body = await response.json()
expect(body.bookingid).toBeTruthy()
console.log('Create Booking', body.bookingid)
})


test ('POST /booking create booking the GET data', async ({ request })  => { //Ingresar Data y consultarla
    const created = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: {
            firstname : "Mauricio",
            lastname : "Morales",
            totalprice : 450,
            depositpaid : true,
            bookingdates: {
                checkin: "2026-06-10",
                checkout: "2026-10-10"
            }, 

            additionalneeds: "Lunch"

            
        },
        headers:{
            'Content-type': 'application/json'
        }
})

expect (created.status()).toBe(200)
const createdBody = await created.json()
const bookingid = createdBody.bookingid


const got = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingid}`)
expect (created.status()).toBe(200)
const gotbody = await got.json()
expect(gotbody.firstname).toBe("Mauricio")
console.log("Booking Validator: ", gotbody.firstname, gotbody.lastname)

})






const BookingSchema = z.object({
    bookingid: z.number(),
    booking: z.object({
    firstname: z.string(),
    lastname: z.string(),
    totalprice: z.number(),
    depositpaid: z.boolean(),
    bookingdates: z.object({
    checkin: z.string(),
    checkout: z.string()
  }),
  additionalneeds: z.string()
  })
})



test('POST /booking - schema validation', async ({ request }) => {
  const response = await request.post('https://restful-booker.herokuapp.com/booking', {
  data: {
        firstname: 'Mauro',
        lastname: 'Mora',
        totalprice: 500,
        depositpaid: true,
        bookingdates: {
        checkin: '2026-06-01',
        checkout: '2026-06-05'
  },
    additionalneeds: 'Breakfast'
    },
    headers: {
    'Content-Type': 'application/json'
    }
  })
  expect(response.status()).toBe(200)
  const body = await response.json()
  const result = BookingSchema.safeParse(body)
  expect(result.success).toBe(true)
})


for (const booking of bookings){
test(`POST /bookings - create booking for ${booking.firstname}`, async ({ request }) => { //Parametrizacion desde JSON file
  const response = await request.post('https://restful-booker.herokuapp.com/booking', {
  data: {
        firstname: booking.firstname,
        lastname: booking.lastname,
        totalprice: booking.totalprice,
        depositpaid: true,
        bookingdates: {
        checkin: '2026-06-01',
        checkout: '2026-06-05'
  },
    additionalneeds: 'Sushi'
    },
    headers: {
    'Content-Type': 'application/json'
    }
  })
  expect(response.status()).toBe(200)
  const body = await response.json()
  expect(body.bookingid).toBeTruthy()
  console.log(`Booking created for ${booking.firstname}:`, body.bookingid)
})
}