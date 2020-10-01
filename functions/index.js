const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe_sk = require("./config");
const stripe = require("stripe")(stripe_sk);
//

//app configure
const app = express();
const PORT = 9000;

//middleware
app.use(cors());
app.use(express.json());

//api routes
app.get("/", (req, res) => {
  console.log("1");
  res.status(200).send(`hello world`);
});

app.post("/create-payment-intent", async (req, res) => {
  const { total } = req.body;
  console.log(total);

  //   res.status(200).send(`${total}`);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

//listener
exports.api = functions.https.onRequest(app);

// firebase emulators:start to run server locally
