import joi from 'joi'

const schema = joi.object().keys({
    title:joi.string().min(3).required(),
    creator:joi.string().trim().min(2),
    message:joi.string().trim().min(3)
})

const validate =(data)=>{
   const result = schema.validate(data)
   result.value = data
   return result
}

export default validate