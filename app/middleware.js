const cors = require("cors");
const express = require("express");

let middleware = [cors(), express.json()];

module.exports = middleware;
