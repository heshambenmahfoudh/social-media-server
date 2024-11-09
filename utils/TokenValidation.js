import jwt from 'jsonwebtoken'
import ApiErr from './apiErr.js'
import { ERR, FAIL } from './httpStatus.js'

// VERVIY TOKEN
export const validateToken = async (req, res, next) => {
  const token = req.headers.cookie?.split('=')[1] || req.cookies?.access_token

  if (!token)
    return next(
      new ApiErr(FAIL, 401, `You are not Authinticated Please SignIn Again`),
    )
    
  if (token) {
    const user = jwt.verify(token, process.env.JWT_SEC)

    if (!user)
      return next(
        new ApiErr(ERR, 500, `Token is not Valid Please SignIn Again`),
      )
    req.user = user
    next()
  }
}

// VERVIY TOKEN USER
export const validateTokenUser = async (req, res, next) => {
  validateToken(req, res, () => {
    req.user?.isAdmin || req.user?.id
      ? next()
      : res.status(403).json({
          status: FAIL,
          message: 'you are not authnticated! please signIn again',
        })
  })
}
