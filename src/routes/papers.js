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
                    uploader: user._id
                }, (err, paperOB) => {
                    paperOB.addFollowedUser(user._id)
                    paperOB.save()
                    user.addPaper(paperOB._id)
                    user.save()
                }).then(paper => res.json({paper}))
            }
        })
})

router.post('/fetchAll', (req, res) => {
    const uploadEmail = decode(req.body.token).email
    User
        .findOne({email: uploadEmail})
        .populate('followedPapers')
        .exec()
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
                const papers = user.followedPapers
                res.json({papers})
            }
        })
})

router.post('/delete', (req, res) => {
    const uploadEmail = decode(req.body.data.token).email
    const paper = req.body.data.paperID
    User.findOneAndUpdate({
        email: uploadEmail
    }, {
        $pull: {
            followedPapers: paper
        }
    }, (err) => {
        if (err) {
            res
                .status(400)
                .json({
                    errors: {
                        global: '非法的Email地址！'
                    }
                })
        } else {
            res.json({})
        }
    })
    User
        .findOne({email: uploadEmail})
        .then(user => {
            Paper.update({
                _id: paper
            }, {
                $pull: {
                    followedUsers: user._id
                }
            }, () => {})

            Paper
                .findOne({_id: paper})
                .then(p => {
                    if (p.followedUsers.length === 0) {
                        Paper.remove({
                            _id: paper
                        }, () => {})
                    }
                })
        })
})

export default router