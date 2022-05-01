const mongoose = require("mongoose");

const reportsendSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    marketID: { type: String, required: true },
    marketName: { type: String, required: true },
    cmdtyID: { type: String, required: true },

    cmdtyName: { type: String, required: true },
    priceUnit: { type: String, required: true },
    users: { type: Array, required: true },
    totalprice: { type: Number, required: true },
    price: { type: Number, required: true },
    count: { type: Number },
  },
  { timestamps: true }
);

const reportsend = new mongoose.model("reportsend", reportsendSchema);

module.exports = reportsend;
