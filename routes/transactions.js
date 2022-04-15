const express = require("express");
const router = express.Router();
const Controller = require("../controllers/transaction");
// const authorization = require("../middlewares/authzEditDelete");
// const authentication = require("../middlewares/authc");


router.get("/", Controller.getTransactions);
router.post("/", Controller.addTransaction);
router.get("/:transactionId", Controller.getTransactionById);
router.put("/:transactionId",  Controller.editTransaction);
router.delete("/:transactionId",  Controller.deleteTransaction);



module.exports = router;