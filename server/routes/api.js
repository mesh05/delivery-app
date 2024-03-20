const express = require("express");
const router = express.Router();
const server = require("http").createServer(router);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
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

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/stalls", (req, res) => {
  res.send({
    stalls: stalls,
  });
});

router.get("/:stall", (req, res) => {
  const stall = req.params.stall;
  res.send({
    stall: stall,
    items: items[stall],
  });
});

router.post("/placeOrder", (req, res) => {
  // send stall name as well from front end
  const { name, roll, phone, location } = req.body;
  const orderId = Math.floor(Math.random() * 1000000 + 1);
  // send it to database instead of logging
  console.log(orderId, name, roll, phone, location);
  placedOrders = [
    ...placedOrders,
    {
      orderId: orderId,
      name: name,
      roll: roll,
      phone: phone,
      location: location,
      cart: req.body.cart,
    },
  ];
  io.emit("new_order", { placedOrders: placedOrders });
  // io.on("connection", (socket) => {
  //   socket.emit("new_order", { placedOrders: placedOrders });
  // });
  res.send({
    orderId: orderId,
    message: "Order placed!",
  });
});

router.get("/order/:id", (req, res) => {
  // database call
  const orderDetails = placedOrders.find(
    (order) => order.orderId == req.params.id
  );
  res.send({ orderDetails: orderDetails });
});

// cancel order

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "burger" && password === "pizza") {
    res.send({ message: "Login successful" });
  } else {
    res.send({ message: "Invalid credentials" });
  }
});

router.get("/stall/orders", function (req, res) {
  res.send({ placedOrders: placedOrders });
});

module.exports = router;
