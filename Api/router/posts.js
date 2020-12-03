import express from 'express'
import { createPost, deletePost, getposts, updatePost } from '../controllers/posts'
import { validatorhandel } from '../middlewares/appMiddlewares'
import validator from './../model/vl-model/index';
const router = express.Router()


router.get('/posts', getposts)
router.post('/posts',validatorhandel(validator.userSchemavalidator), createPost)
router.put('/posts/:id', updatePost)
router.delete('/posts/:id', deletePost)


export default router