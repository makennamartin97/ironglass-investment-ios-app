const express = require("express");
const app = express();
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cors())

app.post('/payment', cors(), async (req, res)=>{
    let {amount, id} = req.body
    const customer = await stripe.customers.create();
    try{
        const payment = await stripe.paymentIntents.create({
            amount,
            currency:'USD',
            setup_future_usage: 'off_session',
            customer: customer.id,
            payment_method_types: ['us_bank_account'],
            payment_method_options: {
                us_bank_account: {
                financial_connections: {permissions: ['payment_method', 'balances']},
                },
            },
                        // payment_method: id,
            // confirm:true
        })
        res.json({
            message:"Success",
            success:true
        })

    }catch(e){
        res.json({
            message:'Failed',
            success:false
        })

    }
    // const session = await stripe.checkout.sessions.create({
    //     mode: 'payment',
    //     customer: '{{CUSTOMER_ID}}',
    //     payment_method_types: ['us_bank_account'],
    //     payment_method_options: {
    //       us_bank_account: {financial_connections: {permissions: ['payment_method']}},
    //     },
    //     line_items: [
    //       {
    //         price_data: {
    //           currency: 'usd',
    //           unit_amount: amount,
    //         },
    //         quantity: 1,
    //       },
    //     ],
    //     success_url: 'www.localhost:3000/success',
    //   });
})

app.get('/secret', async (req, res) => {
    const intent = await stripe.paymentIntents.create({
        amount,
        currency:'USD',
        setup_future_usage: 'off_session',
        customer: customer.id,
        payment_method_types: ['us_bank_account'],
        payment_method_options: {
            us_bank_account: {
            financial_connections: {permissions: ['payment_method', 'balances']},
            },
        }

             
    res.json({client_secret: intent.client_secret});
    })
});

app.listen(process.env.PORT || 4000, ()=>{
    console.log(process.env.PORT,'server listening')
})