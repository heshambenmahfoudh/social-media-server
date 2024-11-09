import ApiErr from '../apiErr.js'
import { FAIL } from '../httpStatus.js'

export const createLoginValidator = (req, res, next) => {
  const { username, password } = req.body
  const pattern = /^[^# ]+@[^ ]+\.[a-z]{2,3}$/
  if (!username) {
    return next(new ApiErr(FAIL, 403, `User Username is Required`))
  }
  if (!!username.match(pattern) === false) {
    return next(new ApiErr(FAIL, 403, `User Username Email Not Valid`))
  }
  if (!password) {
    return next(new ApiErr(FAIL, 403, `User Password is Required`))
  }
  next()
}
