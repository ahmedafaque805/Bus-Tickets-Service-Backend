const express = require('express')
const Bus = require('../models/bus')

const router = express.Router()

// Get Bus Route
router.get('/getBus', (req, res) => {
    Bus.find({}, (err, doc) => {
        if (err) {
            return res.json({ message: "Failed", err })
        }
        else {
            return res.json({ message: "Success", doc })
        }
    })
})

//Create Bus Route
router.post('/addBus', (req, res) => {
    let SeatsArray = []
    for (let i = 0; i < 30; i++) {
        let seatData = {
            seatNumber : i
        }
        SeatsArray.push(seatData)
    }
    let data = {
        busName: req.body.busName,
        from: req.body.from,
        to: req.body.to,
        seats: SeatsArray,
    }
    Bus.create(data, (err, doc) => {
        if (err) {
            return res.json({ message: "Failed", err })
        }
        else {
            return res.json({ message: "Success", doc })
        }
    })
})


// // Delete Author Route
// router.delete('/deleteAuthor', (req, res) => {
//     let { id } = req.body
//     Author.findByIdAndRemove(id ,(err, doc) => {
//         if (err) {
//             return res.json({ message: "Failed", err })
//         }
//         else {
//             return res.json({ message: "Success", doc })
//         }
//     })
// })


// // Add books Route
// router.put('/AddBooks', (req, res) => {
//     let { id } = req.body
//     let obj={
//         title:req.body.title,
//         pages:req.body.pages
//     }
//     Author.findByIdAndUpdate(id,{$push:{books:obj}},{new:true}, (err, doc) => {
//         if (err) {
//             return res.json({ message: "Failed", err })
//         }
//         else {
//             return res.json({ message: "Success", doc })
//         }
//     })
// })


// // Update Books Route
// router.put('/UpdateBooks', (req, res) => {
//     Author.findOneAndUpdate({"_id":req.body.id,"books._id":req.body.bookId},{"books.$.title":req.body.title},{new:true}, (err, doc) => {
//         if (err) {
//             return res.json({ message: "Failed", err })
//         }
//         else {
//             return res.json({ message: "Success", doc })
//         }
//     })
// })

// // Delete Author Route
// router.delete('/deleteBook', (req, res) => {
//     Author.findOneAndUpdate({ "_id":req.body.id }, { books: { $elemMatch: {"_id": req.body.bookId} } }, {$unset:{books: ""}} ,(err, doc) => {
//         if (err) {
//             return res.json({ message: "Failed", err })
//         }
//         else {
//             return res.json({ message: "Success", doc })
//         }
//     })
// })

module.exports = router