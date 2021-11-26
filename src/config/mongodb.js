require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connect database success");
  } catch (err) {
    console.log(`Connect database failed with error ${err}`);
  }
};

module.exports = { connect };
