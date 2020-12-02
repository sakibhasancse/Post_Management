import expressWinston from 'express-winston'
import MongoDb from 'winston-mongodb'
import winston from 'winston'
import  winstonFile from "winston-daily-rotate-file";
import {ElasticsearchTransport } from 'winston-elasticsearch'


const getmessage = (req ,res)=>{
    let obj  ={
        correlationId : req.headers['x-correlation-id'],
        requestbody: req.body
    }
    return JSON.stringify(obj)
}

const esTransportOptions ={
    lavel:'info',
    clientOpts:{node:"http://localhost:9200"},
    indexPrefix:'log-postmanegment'
};

const elasticTransport = new ElasticsearchTransport (esTransportOptions)

const mongoErrorTransport = (mongourl) => new winston.transports.MongoDB({
    db:mongourl,
    metaKey:'meta'
}

)
const fileinfoTransport = new winston.transports.DailyRotateFile(
    {
    filename:'loginfo-%DATE%.log',
    datePattern:'YYYY-MM-DD-HH',
    zippedArchive:true,
    maxSize:'20m',
    maxFiles:'14d',
}
)

 export const infologger = ()=> expressWinston.logger({
    transports:[
        new winston.transports.Console(),
        fileinfoTransport,
        elasticTransport
    ],
    format:winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
        ),
        meta:true,
        msg:getmessage

    })
    

    const errorFileinfo  =  new winston.transports.DailyRotateFile(
        {
            filename:'logError-%DATE%.log',
            datePattern:'YYYY-MM-DD-HH',
            zippedArchive:true,
            maxSize:'20m',
            maxFiles:'14d'
        }
    )
 export  const errorLogger = (mongourl)=> expressWinston.errorLogger({
    transports:[
        new winston.transports.Console(),
        errorFileinfo,
        mongoErrorTransport(mongourl),
        // elasticTransport

    ],
    format:winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ) ,
    meta:true,
    msg:getmessage
})

