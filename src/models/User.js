import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import uniqueValidator from 'mongoose-unique-validator'

const schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        index: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    nickName: {
        type: String,
        required: false
    },
    passwordHash: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    confirmationToken: {
        type: String,
        default: ''
    }
}, {timestamps: true})

schema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compareSync(password, this.passwordHash)
}

schema.methods.setPassword = function setPassword(password) {
    this.passwordHash = bcrypt.hashSync(password, 10)
}

schema.methods.setConfirmationToken = function setConfirmationToken() {
    this.confirmationToken = this.generateJWT()
}

schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
    return `${process.env.HOST}/confirmation/${this.confirmationToken}`
}

schema.methods.generateJWT = function generateJWT() {
    return jwt.sign({
        email: this.email,
        name: this.name,
        confirmed: this.confirmed
    }, process.env.JWT_SECRET)
}

schema.methods.toAuthedJson = function toAuthedJson() {
    return {
        email: this.email,
        name: this.name,
        confirmed: this.confirmed,
        token: this.generateJWT()
    }
}

schema.plugin(uniqueValidator, {
    success: false,
    message: '邮箱已经被使用！'
})

export default mongoose.model('User', schema)