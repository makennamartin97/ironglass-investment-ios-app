const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()

app.use(express.static("public"));
app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/portfolio', (req, res) => {
    console.log(req.query.secret)
    console.log(req.query.key)
    console.log(req.query.passphrase)

    // import crypto library
    var crypto = require('crypto');
    //const fetch = require('node-fetch');

    const url = 'https://api.exchange.coinbase.com/accounts';

    // create the json request object
    var cb_access_timestamp = Date.now() / 1000; // in ms
    //var cb_access_passphrase = req.query.passphrase;
    var cb_access_passphrase = "y44o1nbxir";
    var secret = 'CTJ5mZ4+X8nn0YtteRIldgFouEAE/6K1z+odBs6rSscdSle2OHZWbAHZ4XNV1X2E1anSRstUe5DLprxP+TCN+Q==';
    //var cb_access_key = req.query.key;
    var cb_access_key = "4cc5e34d71a8699bd6c96be03f0cbd2e";
    var requestPath = '/accounts';
    var body = '';
    var method = 'GET';

    // create the prehash string by concatenating required parts
    var message = cb_access_timestamp + method + requestPath;

    // decode the base64 secret
    var key = Buffer.from(secret, 'base64');

    // create a sha256 hmac with the secret
    var hmac = crypto.createHmac('sha256', key);

    // sign the require message with the hmac and base64 encode the result
    var cb_access_sign = hmac.update(message).digest('base64');

    const options = {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        'cb-access-key': cb_access_key,
        'cb-access-passphrase': cb_access_passphrase,
        'cb-access-sign': cb_access_sign,
        'cb-access-timestamp': cb_access_timestamp
        }
    };
  
     fetch(url, options)
         .then(response => response.json())
         .then(response => res.send(response))
         //.then(response => console.log(response))
         .catch(err => console.error(err));
    
    //res.send('Hello World');
    // res.status(200).json({ 
    //     user: "zeyad alaa",
    //     body: "this is body 1"
    // });
})

app.listen(3004)
