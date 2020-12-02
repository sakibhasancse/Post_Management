


import { GenaralError ,BadRequest } from './../utils/error';
export const errorhandle = (err ,req,res,next)=>{
    let code = 500
            if(err instanceof GenaralError){
                 code =err.getCode();
                
            }

            let correlationIds = req.headers['x-correlation-id']
            return res.status(500).json({
                correlationId :correlationIds,
                message:err.message
            })

        }

export const validatorhandel = (validate)=>{

    return (req,res,next)=>{
        const result = validate(req.body)

        if(result.error == null){
              
            return next()
        }
        const {details}  = result.error
        const messages = details.map(msg=>msg.message)
       const msg = messages.join(',')

        throw new BadRequest(msg)
    }
}


export const setCorrelationId = async(req,res,next)=>{
    let correlationId= req.headers['x-correlation-id']
    if(!correlationId){
        correlationId = Date.now().toString();
        req.headers['x-correlation-id'] = correlationId
        
    }
    res.set('x-correlation-id' ,correlationId)
    return next();
}