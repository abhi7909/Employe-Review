/**
 * user shcema to store user information such as
 * 1. user name
 * 2. user email
 * 3. password of user
 * 4. type of user (admin / employee)
 * 5. adminRank of user
 * 6. ObjectId of company
 * 7. array of ObjectIds of recieved feedbacks
 * 8. array of ObjectIds of user (pending feedbacks)
 * 9. total average rating
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    type: {
        type: String,
        required: true,
        enum: ['employee', 'admin']
    },
    adminRank: {
        type: Number,
        default: Number.MAX_VALUE
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    feedbackRecieved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback'
    }],
    feedbackPending: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    rating: {
        type: Number,
        default: 0
    }
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = User;