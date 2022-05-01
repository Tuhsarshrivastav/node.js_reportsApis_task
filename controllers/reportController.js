//Dependencies
const { v4: uuidv4 } = require("uuid");

// models Schema
const report = require("../models/report");
const reportsend = require("../models/sendreport");

class Reports {
  // fatch api
  async fatch(req, res) {
    const reportid = req.query.reportID;
    // checking reportid provied or not
    if (!reportid) {
      return res.status(400).send("Please provide reportid");
    }
    // finding document base on report id
    const finddocument = await reportsend.findOne({ _id: reportid });
    try {
      // sending response
      res.send({
        _id: finddocument._id,
        cmdtyName: finddocument.cmdtyName,
        cmdtyID: finddocument.cmdtyID,
        marketID: finddocument.marketID,
        marketName: finddocument.marketName,
        users: finddocument.users,
        timestamp: finddocument.updatedAt,
        priceUnit: "Kg",
        price: finddocument.price,
      });
    } catch (err) {
      res.send(err);
    }
  }
  async create(req, res) {
    // validation
    if (!req.body) {
      return res.status(400).send("All fields Is Required");
    }

    const reportid = uuidv4();

    // replacing _id with uuid
    const reportdetails = new report({
      ...req.body,
      reportID: reportid,
    });

    const cmdtyID = req.body.cmdtyID;
    const marketID = req.body.marketID;

    // find and date base on user request on marketID and cmdtyID
    let findids = await reportsend.findOneAndDelete({
      marketID: marketID,
      cmdtyID: cmdtyID,
    });

    let findedId;
    let calculatedPrice = 0;
    let counted = 0;
    let Totalprice = 0;
    let addedUsers = [];

    console.log(findids);

    // if findids are not null then we will take next step
    if (findids != null) {
      counted = findids.count + 1;

      // divvied price and convFctr and storing into temp value
      let temp = req.body.price / req.body.convFctr;

      // plusing totalPrice and temp
      Totalprice = findids.totalprice + temp;

      //divvied totalPrice into counted which is positive value
      calculatedPrice = Totalprice / counted;

      // replacing _id to findedID
      findedId = findids._id;

      // added users into addedUsers array which is local and comming from findids
      addedUsers = findids.users;

      // pushing userId into  addedUsers array
      addedUsers.push(req.body.userID);
    } else {
      addedUsers.push(req.body.userID);
      counted = 1;
      calculatedPrice = req.body.price / req.body.convFctr;
      Totalprice = calculatedPrice;

      findedId = reportid;
    }

    // creating new model object
    const reportsave = new reportsend({
      _id: findedId,
      cmdtyName: req.body.cmdtyName,
      cmdtyID: req.body.cmdtyID,
      marketID: req.body.marketID,
      marketName: req.body.marketName,
      users: addedUsers,
      priceUnit: "Kg",
      price: calculatedPrice,
      totalprice: Totalprice,
      count: counted,
    });

    // saving the documents
    await reportsave.save();

    try {
      await reportdetails.save();

      res.json({
        status: "success",
        reportID: findedId,
      });
    } catch (err) {
      res.send(err);
    }
  }
}

module.exports = new Reports();
