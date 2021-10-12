const mongoose = require('mongoose')

// Booking Schema
const bookingSchema = new mongoose.Schema({
    busName:String,
    from:String,
    to:String,
    UserId:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    seatNumber:Number,
    Bookingdate: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('bookings',bookingSchema) 