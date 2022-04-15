const express = require("express");
const router = express.Router();
const transactions = require("./transactions");
const customers = require("./customers");
const stores = require("./stores");

router.use("/customers", customers);
router.use("/stores", stores);
router.use("/transactions", transactions);

module.exports = router;