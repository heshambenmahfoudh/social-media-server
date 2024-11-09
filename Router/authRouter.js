import express from 'express'
import { loginUser, registerUser } from '../Controller/AuthController.js'
import { createLoginValidator } from '../utils/validator/loginValidator.js'
import { createUserValidator } from '../utils/validator/userValidator.js'

const authRouter = express.Router()

// REGISTER

authRouter.post('/auth/register',createUserValidator,registerUser)

// LOGIN
authRouter.post('/auth/login',createLoginValidator, loginUser)

export default authRouter
