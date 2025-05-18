require("dotenv").config();
const express = require("express");
const twilio = require("twilio");

const app = express();
const port = 3000;

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.get("/make-call", (req, res) => {
  client.calls
    .create({
      url: "http://demo.twilio.com/docs/voice.xml", // You can customize this
      to: process.env.TO_PHONE_NUMBER,
      from: process.env.TWILIO_PHONE_NUMBER,
    })
    .then((call) => {
      console.log("Call SID:", call.sid);
      res.status(200).send(`Call initiated! SID: ${call.sid}`);
    })
    .catch((error) => {
      console.error("Error initiating call:", error);
      res.status(500).send("Failed to make call");
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
