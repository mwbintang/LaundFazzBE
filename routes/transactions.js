const express = require("express");
const router = express.Router();
const Controller = require("../controllers");
const authorization = require("../middlewares/authzEditDelete");
// const authentication = require("../middlewares/authc");


router.get("/", Controller.getTransactions);
router.post("/", Controller.addTransaction);
router.get("/:transactionId", Controller.getTransactionById);
router.put("/:transactionId", authorization, Controller.editTransaction);
router.delete("/:transactionId", authorization, Controller.deleteTransaction);



module.exports = router;