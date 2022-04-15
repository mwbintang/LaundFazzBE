const express = require("express");
const router = express.Router();
const Controller = require("../controllers/stores");
const authorization = require("../middlewares/storeAuthz");
const authentication = require("../middlewares/storeAuthc")
const transactions = require("./storeTransactions");;

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.use(authentication);
router.delete("/", authorization, Controller.deleteStore);
router.use("/transactions", transactions);

module.exports = router;