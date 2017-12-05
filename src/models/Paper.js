import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publish: {
        type: String,
        required: false
    },
    year: {
        type: String,
        required: true
    },
    abstract: {
        type: String,
        required: true
    },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    followedUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {timestamps: true})

schema.methods.addFollowedUser = function addFollowedUser(userID) {
    this
        .followedUsers
        .push(userID)
}

export default mongoose.model('Paper', schema)