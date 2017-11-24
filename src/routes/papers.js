import express from 'express'
import decode from 'jwt-decode'

import Paper from '../models/Paper'
import User from '../models/User'

const router = express.Router()

router.post('/addOne', (req, res) => {
    const uploadEmail = decode(req.body.paper.token).email
    User
        .findOne({email: uploadEmail})
        .then(user => {
            if (!user) {
                res
                    .status(400)
                    .json({
                        errors: {
                            global: '非法的Email地址！'
                        }
                    })
            } else {
                Paper.create({
                    ...req.body.paper.data,
                    uploader: uploadEmail
                }, (err, paperOB) => {
                    user.addPaper(paperOB.id)
                    user.save()
                }).then(paper => res.json({paper}))
            }
        })
})

router.post('/fetchAll', (req, res) => {
    const uploadEmail = decode(req.body.token).email
    User
        .find({email: uploadEmail})
        .then(user => {
            if (!user) {
                res
                    .status(400)
                    .json({
                        errors: {
                            global: '非法的Email地址！'
                        }
                    })
            } else {
                Paper
                    .find({uploader: uploadEmail})
                    .then(papers => {
                        res.json({papers})
                    })
            }
        })
})

export default router