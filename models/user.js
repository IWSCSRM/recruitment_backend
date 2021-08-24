const mongoose = require("mongoose");
// const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  branch: {
    type: String,
    required: [true, "Please enter your branch"],
  },
  registrationNo: {
    type: String,
    required: [true, "Please enter registration Number"],
    unique: true,
  },
  year: {
    type: Number,
    required: [true, "Please enter your year"],
  },
  mobileNo: {
    type: Number,
    required: [true, "Please enter a mobile number"],
    unique: true,
  },
  emailId: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
  },
  domain: [
    {
      id: Number,
      select: Boolean,
      isShortlisted: {
        type: Boolean,
        default: false,
      },
      name: String,
      value: String,
    },
  ],
});

userSchema.pre("save", function (next) {
  console.log("User about to be created", this);
  next();
});

// static method to login user
userSchema.statics.login = async function (emailId, registrationNo) {
  const user = await this.findOne({ emailId, registrationNo });
  if (user) {
    return user;
  }
  throw Error("incorrect id");
};

const User = mongoose.model("recr", userSchema);
module.exports = User;
