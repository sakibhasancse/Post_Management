import mongoose from 'mongoose';
import { createPostService, deletePostService, getPostService, updatePostService } from '../service/posts';
import { NotFound } from './../utils/error';




export const getposts = async (req, res, next) => {
    try {
        const posts =await getPostService()
  
       

    return res.status(200).json({

        success: true,
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
        if(newpost instanceof Error){
            return next(newpost ,req ,res)
        }
        return res.status(201).json({
            success:true,
            newpost
        })
    
   
} catch (error) {
    return next(error ,req ,res)
}

    
}

export const updatePost = async(req, res,next)=>{
    try {
        const body = req.body
        const post =  updatePostService(id ,body)
         
      if( post instanceof Error){
        
        return next(post ,req ,res)

    }else{
        return res.status(201).json({
            success:true,
            message:'Post updated',
    
            body
        })
       
    }
}catch(error){
    return next(error ,req ,res)

}

     


}


export const deletePost = async(req, res , next)=>{
    try {
        const id =req.params.id

            const result = await deletePostService(id)

            if(result instanceof Error ){
                return next(result,req,res)

             }else{

                return res.status(201).json({
                    success:true,
                    message:`Post Deleted` 
                })
                   }

} catch (error) {
    return next(error ,req ,res)
    
}

}