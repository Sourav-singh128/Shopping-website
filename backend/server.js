const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const connectDb = require("./db.js");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
const Cart = require("./schema/cartSchema.js");
const User = require("./schema/userSchema.js");
const auth = require("./middleware/auth.js");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connectDb();
console.log("uid ", uuidv1().slice());
var instance = new Razorpay({
  key_id: "rzp_test_hmnWqLnpSS0AAZ",
  key_secret: "UpDsPpJTHa5VUnJPpMRYfcx9",
});

// api for registration.

const token_key = process.env.TOKEN_KEY;
app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  // check if all field are present.
  if (!(firstName && lastName && email && password)) {
    res.status(400).send("all fields are not filled");
  }

  // check if user is already there.
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    res.status(400).send(`user ${email} already exist`);
  }

  // now encrypt the password.
  const saltRound = 10;
  try {
    const encryptPass = await bcrypt.hash(password, saltRound);
    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: encryptPass,
    });

    const token = await jwt.sign(
      { user_id: user._id, email: email },
      token_key,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

// route for login.
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("email ", email, "passs ", password);
  // check if email & password are entered.
  if (!(email && password)) {
    res.status(400).send("email or password is missing");
  }

  // check if entered email is already present.
  const user = await User.findOne({ email: email });

  if (!user) {
    res.status().send("please entered correct email");
  }

  if (await bcrypt.compare(password, user.password)) {
    try {
      const token = await jwt.sign(
        { user_id: user._id, email: email },
        token_key,
        { expiresIn: "2h" }
      );
      user.token = token;
      res.status(200).send(user);
    } catch (err) {
      console.log("error while creating token ", err);
    }
  } else {
    res.status(400).send("invalid credentials");
  }
});

app.get("/prd", async (req, res) => {
  const cart = await Cart.find({});
  try {
    console.log("value fetched", cart);
    res.send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/prd", async (req, res) => {
  //   console.log("req-fronteed", req);
  const cart = new Cart(req.body);
  let data = {};
  try {
    data = await cart.save();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
  //   console.log("data ", data);
});

// create order in razorPay

app.post("/orders", async (req, res) => {
  console.log("amount from frontend ", req.body.amount);
  const options = {
    amount: req.body.amount,
    currency: "INR",
    receipt: `${uuidv1().slice(0, 20)}`, //any unique id
  };
  try {
    const response = await instance.orders.create(options);
    console.log("response from razor order", response);
    res.json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Unable to create order");
  }
});
const server = app.listen(8001, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`host ${host} listening at port ${port}`);
});
