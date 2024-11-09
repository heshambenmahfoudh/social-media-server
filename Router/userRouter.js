import express from 'express'
import {
  deleteUserById,
  followUser,
  getAllUsers,
  getUserById,
  getUsersFrinds,
  UnfollowUser,
  updateUserById,
} from '../Controller/UserController.js'
import { validateTokenUser } from '../utils/TokenValidation.js'

const userRouter = express.Router()

// UPDATE USER
userRouter.put('/users/:id',validateTokenUser, updateUserById)

// DELETE USER
userRouter.delete('/users/:id',validateTokenUser, deleteUserById)

// GET USER
userRouter.get('/users/find/:id',validateTokenUser, getUserById)

// GET USERS
userRouter.get('/users',validateTokenUser, getAllUsers)

// FOLLOWERS USER
userRouter.put('/users/follw/:id',validateTokenUser, followUser)

// UNFOLLOWERS USER
userRouter.put('/users/unfollw/:id',validateTokenUser, UnfollowUser)

// USER FRINDS
userRouter.get('/users/frinds/:id',validateTokenUser, getUsersFrinds)

export default userRouter
