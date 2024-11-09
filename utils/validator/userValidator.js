import ApiErr from '../apiErr.js'
import { FAIL } from '../httpStatus.js'

export const createUserValidator = (req, res, next) => {
  const { username, password, firstname, lastname, connfirmPassword } = req.body
  const pattern = /^[^# ]+@[^ ]+\.[a-z]{2,3}$/
  if (!firstname) {
    return next(new ApiErr(FAIL, 403, `User First Name is Required`))
  }
  if (!lastname) {
    return next(new ApiErr(FAIL, 403, `User Last Name is Required`))
  }
  if (!username) {
    return next(new ApiErr(FAIL, 403, `User Username is Required`))
  }
  if (!!username.match(pattern) === false) {
    return next(new ApiErr(FAIL, 403, `User Username Email Not Valid`))
  }
  if (!password) {
    return next(new ApiErr(FAIL, 403, `User Password is Required`))
  }
  if (password !== connfirmPassword) {
    return next(new ApiErr(FAIL, 403, `Confirm Password Not Same`))
  }
  next()
}
