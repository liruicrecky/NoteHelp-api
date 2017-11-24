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
        type: String,
        required: true
    }
}, {timestamps: true})

schema.methods.setUploader = function setUploader(email) {
    this.uploader = email
}

export default mongoose.model('Paper', schema)