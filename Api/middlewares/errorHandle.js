

import { GenaralError } from './../utils/error';
export const errorhandle = (err ,req,res,next)=>{

            if(err instanceof GenaralError){
                const code =err.getCode();
                return res.status(code).json({
                    name:err.name,
                    message:err.message

                })
                
            }
            return res.status(500).json({
                name:'Internal server Error',
                message:err.message
            })

        }