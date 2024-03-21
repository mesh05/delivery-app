const express = require("express");
const app = require("./app");
const path = require("path");
const { io, server } = require("./ws");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
var apiRouter = require("./routes/api");

const port = 3000;
app.use(cors());
app.use(bodyParser.json());

app.use("/api", apiRouter);
app.use("/", express.static("public"));
app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected: ", socket.id);
  io.on("disconnect", (socket) => {
    console.log("a user disconnected: ", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
