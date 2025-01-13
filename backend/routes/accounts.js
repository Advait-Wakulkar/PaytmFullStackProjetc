const express = require("express")
const { Account } = require("../db")
const { authMiddleware } = require("./middleware")

const router = express.Router()

router.get("/balance", authMiddleware ,async (req, res)=>{
    const response = await Account.findOne({
        userId : req.userId
    })

    res.json({
        balance : response.balance
    })
})

router.post("/transfer", authMiddleware, async (req, res)=>{
    
})

module.exports = router  