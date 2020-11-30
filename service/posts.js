import POST from './../model/posts';
import { NotFound } from './../utils/error';

export const createPostService  = async(post)=>{
    
    const newpost = new POST(post)
    console.log(post)
    const  savepost  = await newpost.save()
    return savepost;

}

export const getPostService =async()=>{
    const posts = await POST.find()
    return posts ;
}
export const updatePostService =async(id,body )=>{
    
    const post = await POST.findById(id)
    if(post){
        post.title =body.title,
        post.creator =body.creator,
        post.message = body.message,
        post.save()

    }
    return new Error(`Post Not Found`);


}
export const deletePostService =async(id)=>{
     const user = await POST.findById(id)
    if(user){
        
        const posts = await POST.deleteOne({_id:id})
        return posts ;
    }
    return new NotFound(`Post Not Found`);
}