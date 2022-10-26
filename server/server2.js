//more stripe ach attempts

const express = require("express");
const app = express();
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
// async const customer = await stripe.customers.create();
app.use(express.static("public"));
app.use(express.json());

app.get('/secret', async (req, res) => {
    const intent = // ... Fetch or create the PaymentIntent
    res.json({client_secret: intent.client_secret});
  });

const calculateOrderAmount = (items) => {
    const amount = items;
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return amount;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  const customer = await stripe.customers.create();

  // Create a PaymentIntent with the order amount and currency

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'usd',
    setup_future_usage: 'off_session',
    customer: '{{CUSTOMER_ID}}',
    // payment_method_types: ['us_bank_account'],
    // payment_method_options: {
    //   us_bank_account: {
    //     financial_connections: {permissions: ['payment_method', 'balances']},
    //   },
    // },
    automatic_payment_methods: {
        enabled: true,
      },
  })

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));