import express from 'express'

import User from '../models/User'
import parseErrors from '../utils/parseErrors'
// import {sendConfirmationEmail} from '../mailer'

const router = express.Router()

router.post('/', (req, res) => {
    const {email, name, password} = req.body.user
    const user = new User({email, name})
    user.setPassword(password)
    user.setConfirmationToken()
    user
        .save()
        .then(// userRecord => {
           // sendConfirmationEmail(userRecord) 发送验证邮件
            res.json({
                success: true
            })
    //    }
        )
        .catch(err => res.status(400).json({
            errors: parseErrors(err.errors)
        }))
})

export default router