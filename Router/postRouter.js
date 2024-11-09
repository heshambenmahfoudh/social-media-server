import express from 'express'
import {
  collectionPost,
  createPost,
  deletePostById,
  getPostById,
  getPostUser,
  likePost,
  updatePostById,
} from '../Controller/PostController.js'
import { createPostValidator } from '../utils/validator/postValidator.js'
import { validateTokenUser } from '../utils/TokenValidation.js'

const postRouter = express.Router()

postRouter.post('/posts',validateTokenUser, createPostValidator, createPost)
postRouter.get('/posts/:id',validateTokenUser, getPostById)
postRouter.put('/posts/:id',validateTokenUser, updatePostById)
postRouter.delete('/posts/:id', validateTokenUser,deletePostById)
postRouter.put('/posts/likes/:id',validateTokenUser, likePost)
postRouter.get('/posts/followingPost/:id',validateTokenUser, collectionPost)
postRouter.get('/posts/userpost/:id',validateTokenUser, getPostUser)

export default postRouter
