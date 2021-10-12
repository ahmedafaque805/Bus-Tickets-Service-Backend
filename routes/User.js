const express = require('express')
const User = require('../models/user')
const Otp = require('../models/otp')
const UserAuth = require('../UserAuth')
const bcrypt = require('bcrypt');
const router = express.Router()

const saltRounds = 10;

// Get User Route
router.get('/getUsers', (req, res) => {
    User.find({}, (err, doc) => {
        if (err) {
            return res.json({ message: "Failed", err })
        }
        else {
            return res.json({ message: "Success", doc })
        }
    })
})

// Post User Route
router.post('/createUser', async (req, res) => {
    let RandomNumber = Math.floor((Math.random() * 1000000) + 1);
    let HashPassword = await bcrypt.hash(req.body.password, saltRounds)
    console.log(HashPassword)

    let Userdata = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: HashPassword
    }
    let Otpdata = {
        email: req.body.email,
        otpCode: RandomNumber
    }
    User.create(Userdata, (err, doc) => {
        if (err) {
            return res.json({ message: "Failed", err })
        }
        else {
            Otp.create(Otpdata, (errr, docc) => {
                if (errr) {
                    return res.json({ message: "Failed", errr })
                }
                else {
                    return res.json({ message: "Success", doc })
                }
            })
            // return res.json({ message: "Success", doc })
        }
    })
})

// Update User Route
router.put('/updateUser', (req, res) => {
    let { id } = req.body
    let data = req.body
    User.findByIdAndUpdate(id, data, { new: true }, (err, doc) => {
        if (err) {
            return res.json({ message: "Failed", err })
        }
        else {
            return res.json({ message: "Success", doc })
        }
    })
})


// Delete User Route
router.delete('/deleteUser', (req, res) => {
    let { id } = req.body
    User.findByIdAndRemove(id, (err, doc) => {
        if (err) {
            return res.json({ message: "Failed", err })
        }
        else {
            return res.json({ message: "Success", doc })
        }
    })
})

// Get Otp Route
router.get('/getOtps', (req, res) => {
    Otp.find({}, (err, doc) => {
        if (err) {
            return res.json({ message: "Failed", err })
        }
        else {
            return res.json({ message: "Success", doc })
        }
    })
})

// Verify User Route
router.post('/verifyUser', (req, res) => {

    Otp.findOne({ email: req.body.email, otpCode: req.body.otpCode }, (err, doc) => {
        if (err) {
            return res.json({ message: "Failed", err })
        }
        else {
            User.findOneAndUpdate({ email: req.body.email }, { enabled: true }, { new: true }, (errr, docc) => {
                if (errr) {
                    return res.json({ message: "Failed", errr })
                }
                else {
                    return res.json({ message: "Success", docc })
                }
            })
        }
    })
})


// Login User Route
router.post('/LoginUser', UserAuth,(req, res) => {
    
    User.findOne({ email: req.body.email }, (err, doc) => {
        if (err) {
            return res.json({ message: "Failed", err })
        }
        else {
           bcrypt.compare(req.body.password, doc.password ,(errr,docc) => {
               if(errr){
                   return res.json({ message: "Invalid Password" })
                }
                if(docc){
                    return res.json({ message: "Success", doc })
                }
                else{
                    return res.json({ message: "InValid Credientials" })
               }
           })
        }
    })
})


module.exports = router
