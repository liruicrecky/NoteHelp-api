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
                            global: "Invalid credentials"
                        }
                    })
            }
        })
})

export default router