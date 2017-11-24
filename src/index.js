import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import bluePromise from 'bluebird'
import dotenv from 'dotenv'

import auth from './routes/auth'
import users from './routes/users'
import papers from './routes/papers'

dotenv.config()
const app = express()
app.use(bodyParser.json())
mongoose.Promise = bluePromise
mongoose.connect(process.env.MONGODB_URL, {useMongoClient: true})

app.use('/api/auth', auth)
app.use('/api/users', users)
app.use('/api/papers', papers)

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(8080, () => console.log('Server running on localhost:8080'))