const mongoose = require('mongoose')

// User Schema
const otpSchema = new mongoose.Schema({
    email: String,
    otpCode: Number
})

module.exports = mongoose.model('otps',otpSchema) 