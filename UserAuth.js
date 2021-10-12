const User = require('./models/user')
const bcrypt = require('bcrypt');


const UserAuth = (req, res, next) => {
    User.findOne({ email: req.body.email ,enabled: true }, (err, doc) => {
        if (err) {
            return res.json({ message: "Failed", err })
        }
        else {
            if (doc === null) {
                return res.json({ message: "User Not Verified" })
            }
               
            next() 
        }
    })
}

module.exports = UserAuth