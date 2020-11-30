import express from 'express'
import { getposts ,createPost ,deletePost ,updatePost} from '../controllers/posts'
const router = express.Router()

router.get('/', getposts)
router.post('/posts', createPost)
router.put('/posts/:id', updatePost)
router.delete('/posts/:id', deletePost)


export default router