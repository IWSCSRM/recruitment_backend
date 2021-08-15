const mongoose = require("mongoose");
require("dotenv").config();

// const url = process.env.CONNECTION_URL;
mongoose
  .connect(
    process.env.MONGO_URL,
    // "mongodb+srv://hackDB:Jayesh@135@cluster0.lev68.mongodb.net/creamzoDB"
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
