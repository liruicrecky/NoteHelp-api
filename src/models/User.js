import mongoose from 'mongoose'

const schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        idex: true
    },
    passwordHash: {
        type: String,
        required: true
    }
}, {timestamps: true})

export default mongoose.model('User', schema)