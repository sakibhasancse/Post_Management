

import express from 'express'
import bodyparser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
const app = express()
import dotenv from 'dotenv'
import morgan from 'morgan'

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: './config/config.env' })
}


const PORT = process.env.PORT 
const mongourl = process.env.MONGODBURL

app.use(bodyparser.json({ limit: "30mb", extended: true }))
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())


app.use(morgan('dev'))

import postRouter from './router/posts'
import { errorhandle } from './middlewares/errorHandle';


app.use(postRouter)
app.use(errorhandle)

mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {
        console.log(`server is runniung on ${PORT}`)
    }))
    .catch((err) => console.log(err.message));

mongoose.set('useFindAndModify', false)












