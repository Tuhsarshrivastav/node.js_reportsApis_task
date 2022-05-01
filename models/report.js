const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    reportID: { type: String },
    marketID: { type: String, required: true },
    marketName: { type: String, required: true },
    cmdtyID: { type: String, required: true },
    marketType: { type: String },
    cmdtyName: { type: String, required: true },
    priceUnit: { type: String, required: true },
    convFctr: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const report = new mongoose.model("report", reportSchema);

module.exports = report;
