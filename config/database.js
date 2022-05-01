//Dependencies
const mongoose = require("mongoose");

const Connect = async () => {
  try {
    await mongoose.connect(process.env.Database);
    console.log("Successfully Connected With Database");
  } catch (error) {
    console.log(error.message);
    process.exit;
  }
};

module.exports = Connect;
