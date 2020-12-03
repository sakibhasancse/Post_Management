

import bodyparser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import { errorhandle, setCorrelationId } from './Api/middlewares/appMiddlewares'
import { errorLogger, infologger } from './Api/middlewares/logger'
import postRouter from './Api/router/posts'
import { DBCON } from './config/dbCon'

const app = express()

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: './config/config.env' })
    app.use(morgan('dev'))
}


const mongourl = process.env.MONGODBURL

app.use(bodyparser.json({ limit: "30mb", extended: true }))
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

DBCON(mongourl)
app.use(setCorrelationId)

if(process.env.PROCESSNAME !== 'TEST'){
    app.use(infologger() )
}
app.use(postRouter)

if(process.env.PROCESSNAME !== 'TEST'){
    app.use(errorLogger (mongourl))
}

app.use(errorhandle)

export default app
