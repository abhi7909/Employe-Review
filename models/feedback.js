/**
 * feedback schema to store feedback information 
 * stores 
 * 1. sender ObjectId
 * 2. reciever ObjectId
 * 3. log (feedback text)
 * 4. rating of feedback (0-5)
 */


const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    log: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    }
}, { timestamps: true });


const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;