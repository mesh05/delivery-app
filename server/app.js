var express = require("express");

var app = express();

app.use(express.static(__dirname + "/public"));
app.set("views engine", "ejs");
app.set("views", __dirname + "/");

module.exports = app;
