import ApiErr from '../apiErr.js'
import { FAIL } from '../httpStatus.js'

export const createPostValidator = (req, res, next) => {
  const { description} = req.body
  if (!description) {
    return next(new ApiErr(FAIL, 403, `Post Description is Required`))
  }
  
  next()
}
