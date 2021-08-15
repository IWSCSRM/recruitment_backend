const express = require("express");
const cors = require("cors");
require("./db/connection");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");

require("dotenv").config();
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));
app.use(express.json());
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use("/api", routes);

const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log("Server started successfully");
});
