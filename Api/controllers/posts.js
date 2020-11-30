import mongoose from 'mongoose';
import { createPostService, deletePostService, getPostService, updatePostService } from '../service/posts';
import { NotFound } from './../utils/error';


export const getposts = async (req, res, next) => {
    try {
        const posts =await getPostService()
        let len =posts.length

    res.status(200).json({

        success: true,
        len,
        posts:posts
    })

    } catch (error) {
        console.log(error)
        res.status(404).json({
            success: false,
            error:error.message
        })
    } 
}

export const createPost = async(req, res, next) => {
    
    
    try {
        const data = req.body
        const newpost = await createPostService(data)
        return res.status(201).json({
            success:true,
            newpost
        })
    
   
} catch (error) {
    return res.status(404).json({
        success:false,
        message:error.message
    }) 
}

    
}

export const updatePost = async(req, res)=>{
    // try {

        const id =req.params.id
       const newid = mongoose.isValidObjectId(id)
       if (newid) {
        const body = req.body
        const post =  updatePostService(id ,body)
         
      if( post instanceof Error){
        
        return res.status(404).json({
            success:false,
            message:post.message,
    
       
        })
           
       
    }else{
        return res.status(201).json({
            success:true,
            message:'Post updated',
    
            body
        })
       
    }

           
       }else{
        return res.status(400).json({
            success:false,
            message:`Id is not valid`,
    
       
        })
       }
       


}


export const deletePost = async(req, res , next)=>{
    try {
        const id =req.params.id
       
        // const newid = mongoose.isValidObjectId(id)
        // if (newid) {
     
    
            const result = await deletePostService(id)

            if(result instanceof Error ){
                return next(result,req,res)

             }else{

                return res.status(201).json({
                    success:true,
                    message:`Post Deleted` 
                })
                   }
       

      


    // }else{
    //     return res.status(404).json({
    //         success:false,
    //         message:`id is not valid`
    //     }) 
    // }
} catch (error) {
    return next(error ,req ,res)
    
}



}