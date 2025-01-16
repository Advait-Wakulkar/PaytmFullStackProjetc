const express = require("express");
const { Account, User } = require("../db");
const { authMiddleware } = require("./middleware");
const { mongo, default: mongoose } = require("mongoose");

const router = express.Router();

router.use(express.json())

router.get("/balance", authMiddleware, async (req, res) => {
    const response = await Account.findOne({
        userId: req.userId,
    });

    res.json({
        balance: response.balance,
    });
});

const transferFunds = async function (ToAccountID, FromAccountID, Amount) {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const user1 = await Account.findByIdAndUpdate(
            ToAccountID,
            { $inc: { balance: -Amount } },
            { session, new: true }
        );

        const user2 = await Account.findByIdAndUpdate(
            FromAccountID,
            { $inc: { balance: Amount } },
            { session, new: true }
        );

        if (!user1 || !user2) {
            throw new Error("User not found");
        }

        await session.commitTransaction();
        console.log("Transaction committed.");
    } catch (error) {
        await session.abortTransaction();
        console.error("Transaction aborted:", error);
        throw error;
    } finally {
        session.endSession();
    }
};

router.post("/transfer", authMiddleware, async (req, res) => {
    const { ToAccountID, FromAccountID, Amount } = req.body;

    if (!ToAccountID || !FromAccountID || !Amount || Amount <= 0) {
        return res.status(400).json({ error: "Invalid input data" });
    }

    try {
        await transferFunds(ToAccountID, FromAccountID, Amount);
        res.status(200).json({ message: "Funds transferred successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
