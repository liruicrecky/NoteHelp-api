import express from 'express'

import User from '../models/User'

const router = express.Router()

router.post('/', (req, res) => {
    const {userCredentials} = req.body
    User
        .findOne({email: userCredentials.email})
        .then(user => {
            if (user && user.isValidPassword(userCredentials.password)) {
                res.json({success: true})
            } else {
                res
                    .status(400)
                    .json({
                        errors: {
                            global: '无效的用户名或密码'
                        }
                    })
            }
        })
})

router.post('/reset_password', (req, res) => {
    const {updateEmail, password} = req.body.data
    User
        .findOne({email: updateEmail})
        .then(user => {
            if (user) {
                user.setPassword(password)
                res.json({success: true})
            } else {
                res
                    .status(400)
                    .json({errors: {global: '没有这个邮件地址！'}})
            }
        })
})

/*
router.post('/reset_password_request', (req, res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (user) {
            // sendResetPasswordEmail(user);
            res.json({success: true})
        } else {
            res.status(400).json({errors: {global:'无效的邮件地址！'}})
        }
    })
})
*/
export default router