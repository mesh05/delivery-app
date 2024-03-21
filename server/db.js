const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");

const port = 3000;
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@delivery-app.5jye8pq.mongodb.net/?retryWrites=true&w=majority&appName=delivery-app`;

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoose.connect(uri);
    // Send a ping to confirm a successful connection
    console.log("Connected successfully to MongoDB");
  } catch (e) {
    console.error(e);
  }
}
run();

const orderSchema = new mongoose.Schema({
  orderId: Number,
  name: String,
  roll: String,
  phone: String,
  location: String,
  cart: Object,
  status: String,
});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
