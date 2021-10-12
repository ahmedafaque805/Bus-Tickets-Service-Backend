const express = require('express')
const Booking = require('../models/booking')
const Bus = require('../models/bus')

const router = express.Router()

// Get Bus Route
router.get('/allBookings', (req, res) => {
    Booking.find().populate('UserId').exec((err, doc) => {
        if (err) {
            return res.json({ message: "Failed", err })
        }
        else {
            return res.json({ message: "Success", doc })
        }
    })
})

//Seat Booking Route
router.post('/seatBooking', (req, res) => {
    Bus.findOne({ _id: req.body.id }, (err4, doc4) => {
        if (err4) {
            return res.json({ message: "Failed", err4 })
        } else {
            if (doc4 == null) {
                return res.json({ message: "This Bus is not Avaialble" })
            } else {
                Bus.findOne({seats : { $elemMatch : { seatStatus :"Booked" }}}, (err3, doc3) => {
                    if (err3) {
                        return res.json({ message: "Failed", err3 })
                    } else {
                        console.log(doc3)
                        if (doc3 == null) {

                            return res.json({ message: "This Seat is already Booked" })
                        }
                        const SeatID = { _id: req.body.id, "seats._id": req.body.seatData.seatId };
                        const update = { $set: { "seats.$.seatStatus": "Booked" } };
                        Bus.findOneAndUpdate(SeatID, update, { new: true }, (err2, doc2) => {
                            // console.log(doc2)
                            if (err2) {
                                return res.json({ message: "Failed", err2 })
                            } else {
                                let SeatData = {
                                    busName: doc2.busName,
                                    from: doc2.from,
                                    to: doc2.to,
                                    UserId: req.body.UserId,
                                    seatNumber: req.body.seatData.seatNumber
                                }
                                Booking.create(SeatData, (err, doc) => {
                                    if (err) {
                                        return res.json({ message: "Failed", err })
                                    } else {
                                        return res.json({ message: "Success", doc })
                                    }
                                })
                            }
                        })
                    }
                })
            }

        }
    })
})


module.exports = router

