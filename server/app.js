require("dotenv").config();
const express = require("express");
var cors = require('cors')

const app = express();
const routes = require("./routes/index");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())
app.use(routes);

module.exports = app;
