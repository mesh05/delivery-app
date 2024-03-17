const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const stalls = [
  "stall1",
  "stall2",
  "stall3",
  "stall4",
  "stall5",
  "stall7",
  "stall8",
];
const items = {
  stall1: ["item1"],
  stall2: ["item1", "item2"],
  stall3: ["item1", "item2", "item3"],
  stall4: ["item1", "item2", "item3", "item4"],
  stall5: ["item1", "item2", "item3", "item4", "item5"],
  stall6: ["item1", "item2", "item3", "item4", "item5", "item6"],
  stall7: ["item1", "item2", "item3", "item4", "item5", "item6", "item7"],
  stall8: [
    "item1",
    "item2",
    "item3",
    "item4",
    "item5",
    "item6",
    "item7",
    "item8",
  ],
};

let placedOrders = [];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/stalls", (req, res) => {
  res.send({
    stalls: stalls,
  });
});

app.get("/:stall", (req, res) => {
  const stall = req.params.stall;
  res.send({
    stall: stall,
    items: items[stall],
  });
});

app.post("/placeOrder", (req, res) => {
  const { name, roll, phone, location } = req.body;
  const orderId = Math.floor(Math.random() * 1000000 + 1);
  // send it to database instead of logging
  console.log(orderId, name, roll, phone, location);
  placedOrders.push({
    orderId: orderId,
    name: name,
    roll: roll,
    phone: phone,
    location: location,
    cart: req.body.cart,
  });
  res.send({
    orderId: orderId,
    message: "Order placed!",
  });
});

app.get("/order/:id", (req, res) => {
  // database call
  const orderDetails = placedOrders.find(
    (order) => order.orderId == req.params.id
  );
  console.log(orderDetails);
  res.send({ orderDetails: orderDetails });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
