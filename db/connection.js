const mongoose = require("mongoose");
require("dotenv").config();

// const url = process.env.CONNECTION_URL;
mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,

    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
