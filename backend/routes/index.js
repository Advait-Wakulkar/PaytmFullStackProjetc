const express = require('express');
const userRouter = require("./user");
const adminRouter = require("./accounts")

const router = express.Router();

router.use("/user", userRouter)
router.use("/account", adminRouter)

module.exports = router;