import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const schema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
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

schema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compareSync(password, this.passwordHash)
}

schema.methods.generateJWT = function generateJWT() {
    return jwt.sign({
        email: this.email
    }, process.env.JWT_SECRET)
}

schema.methods.toAuthedJson = function toAuthedJson() {
    return {
        email: this.email,
        token: this.generateJWT()
    }
}

export default mongoose.model('User', schema)