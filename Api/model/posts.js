import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title:{
        type:String ,
        required:true

    } ,
        
    message:{
        type:String ,
        required:true
        
    } ,
    creator:{
        type:String ,
        required:true
        
    } ,

},{timestamp:true}) 

const posts  = mongoose.model('POST', postSchema)
export default posts 