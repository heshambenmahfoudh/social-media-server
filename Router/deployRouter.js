import express from 'express'
import multer from 'multer'
import { ERR, FAIL, SUCCESS } from '../utils/httpStatus.js'
import ApiErr from '../utils/apiErr.js'
import { validateTokenUser } from '../utils/TokenValidation.js'
const deployRouter = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    const fileName = `photos_${Date.now()}.${file.mimetype.split('/')[1]}`
    cb(null, fileName)
  },
})
const deploied = multer({ storage: storage })

deployRouter.post('/deploy',validateTokenUser, deploied.single('photo'), (req, res,next) => {
  try {
    const { filename } = req.file
    return res.status(200).json(filename)
  } catch (err) {
    return next(new ApiErr(ERR, 500, `Failed to Deploy Image`))
  }
})
export default deployRouter
