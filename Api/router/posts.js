import express from 'express'
import { createPost, deletePost, getposts, updatePost } from '../controllers/posts'
const router = express.Router()

router.get('/posts', getposts)
router.post('/posts', createPost)
router.put('/posts/:id', updatePost)
router.delete('/posts/:id', deletePost)


export default router