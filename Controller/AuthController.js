import User from '../Model/UserMod.js'
import ApiErr from '../utils/apiErr.js'
import { ERR, FAIL, SUCCESS } from '../utils/httpStatus.js'
import generateJWT from '../utils/generateJWT.js'
import { bcryptPassword, comparePassword } from '../utils/bcryptPassword.js'

// REGISTER
export const registerUser = async (req, res, next) => {
  const { firstname, lastname, username, password } = req.body

  const oldUser = await User.findOne({ username })
  if (oldUser) {
    return next(new ApiErr(FAIL, 403, `User ${username} Alredy Found `))
  }

  try {
    const newUser = await User.create({
      username,
      firstname,
      lastname,
      password: await bcryptPassword(password),
    })

    const savedUser = await newUser.save()

    return res.status(200).json({ status: SUCCESS, data: savedUser })
  } catch (err) {
    return next(new ApiErr(ERR, 500, `Failed To Create User`))
  }
}

// LOGIN
export const loginUser = async (req, res, next) => {
  const {  username, password } = req.body
  const passwordBody = password;

  try {
    const user = await User.findOne({
      username,
    })

    if (!user)
      return next(new ApiErr(FAIL, 402, `User (${username}) Not Found`))

    const isPassowrd = await comparePassword(passwordBody, user.password)

    if (!isPassowrd) {
      return next(new ApiErr(FAIL, 403, `Wrong Password or Username`))
    }

    const accessToken = await generateJWT({
      id: user?._id,
      username: user?.username,
    })

    const {
      password,
      isAdmin,
      createdAt,
      updatedAt,
      ...otherDetails
    } = user._doc

    return res
      .cookie('access_token', accessToken, { httpOnly: true })
      .status(200)
      .json({
        status: SUCCESS,
        data: otherDetails,
      })
  } catch (err) {
    return next(new ApiErr(ERR, 500, `Failed To Login User`))
  }
}
