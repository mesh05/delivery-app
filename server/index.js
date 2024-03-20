const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
var router = new express.Router();
const port = 3000;
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use("/",express.static("public"));
app.use("/*",(req,res) => {
	res.sendFile(path.join(__dirname + "/public/index.html"));
})

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

app.get("/api/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/stalls", (req, res) => {
  res.send({
    stalls: stalls,
  });
});

app.get("/api/:stall", (req, res) => {
  const stall = req.params.stall;
  res.send({
    stall: stall,
    items: items[stall],
  });
});

app.post("/api/placeOrder", (req, res) => {
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

app.get("/api/order/:id", (req, res) => {
  // database call
  const orderDetails = placedOrders.find(
    (order) => order.orderId == req.params.id
  );
  res.send({ orderDetails: orderDetails });
});

// cancel order

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "burger" && password === "pizza") {
    res.send({ message: "Login successful" });
  } else {
    res.send({ message: "Invalid credentials" });
  }
});

app.get("/api/stall/orders", function (req, res) {
  res.send({ placedOrders: placedOrders });
});

io.on("connection", (socket) => {
  console.log("a user connected: ", socket.id);
  socket.emit("connected", { message: "Connected to server via socket" });
});

io.on("disconnect", (socket) => {
  console.log("a user disconnected: ", socket.id);
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
