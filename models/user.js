const mongoose = require('mongoose')

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type:String,
        unique:true
    },
    phone: Number,
    date: {
        type: Date,
        default: Date.now()
    },
    enabled:{
        type: Boolean,
        default:false
    },
    password:String
})

module.exports = mongoose.model('users',userSchema) 