const express = require("express");
const router = express.Router();

const reportController = require("../controllers/reportController");

// get reports router
router.get("/", reportController.fatch);

// post reports router
router.post("/", reportController.create);

module.exports = router;
