const express = require('express');
const zod = require('zod');
const { User } = require('../db');
const {JWT_SECRET} = require('../config')
const jwt = require('jsonwebtoken')

const signupSchema = zod.object({
    username : zod.string().email(),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string()
})

const signinSchema = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

const router = express.Router();
router.use(express.json())

router.post("/signup", async (req, res)=>{
    const response = signupSchema.safeParse(req.body)
    if (!response.success){
        return res.json({
            message: "Incorrect inputs"
        })
    }
    const existingUser =  await User.findOne({
        username : req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const user = await User.create({
        username : req.body.username,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : req.body.password
    })

    const userId = user._id

    const token = jwt.sign({userId}, JWT_SECRET)

    res.json({
        message : "User created successfully",
        token : token
    })
})

router.post("/signin", async (req, res)=>{
    const response = signinSchema.safeParse(req.body)
    console.log(response.success)
    if(!response.success){
        return res.json({
            message: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username : req.body.username,
        password : req.body.password
    })

    console.log(existingUser)

    if(!existingUser){
        return res.status(411).json(
            {
                message: "Error while logging in"
            }
        )
    }

    const token = jwt.sign({userId : existingUser._id}, JWT_SECRET)

    return res.status(200).json(
        {
           token : token
        }
    )
})

module.exports = router;