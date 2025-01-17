const express = require('express');
const userRouter = require("./user");
const adminRouter = require("./accounts")
const cors = require("cors")

const router = express.Router();

router.use(cors())

router.use("/user", userRouter)
router.use("/account", adminRouter)

module.exports = router;