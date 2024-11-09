import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRouter from './Router/authRouter.js'
import usersRouter from './Router/userRouter.js'
import postsRouter from './Router/postRouter.js'
import deployRouter from './Router/deployRouter.js'
import { globalErr } from './middleware/errMiddleware.js'
import dbConnection from './config/db.js'
const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()

mongoose.set('strictQuery', true)

dbConnection()
app.use(express.static('public'))
app.use('/images', express.static('images'))
// MIDDLWARE
app.use('/api/v1', authRouter)
app.use('/api/v1', usersRouter)
app.use('/api/v1', postsRouter)
app.use('/api/v1', deployRouter)

// HANDLE ERR IN EXPRESS
app.use(globalErr)

// RUN SERVER IN EXPRESS
const server = app.listen(process.env.PORT, () => {
  console.log(`Starting server running on port (${process.env.PORT})... :) `)
})

// HANDLE ERR OUT EXPRESS
process.on('unhandledRejection', (err) => {
  console.log(`unhandledRejection err 
    :( => 
    errName : ${err.name}  
    errMessage : ${err.message}`)
  server.close(() => {
    console.log(`server close`)
    process.exit(1)
  })
})
