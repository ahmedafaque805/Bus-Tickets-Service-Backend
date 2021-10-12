const mongoose = require('mongoose')

// Books Schema
const seatsSchema = new mongoose.Schema({
    seatNumber:Number,
    seatStatus:{
        type:String,
        default:'Not Booked'
    }
})

// Bus Schema
const busSchema = new mongoose.Schema({
    busName:{
        type:String,
        unique:true
    },
    from:String,
    to:String,
    date: {
        type: Date,
        default: Date.now()
    },
    seats:[seatsSchema]
})

module.exports = mongoose.model('buses',busSchema) 