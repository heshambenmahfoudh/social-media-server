import jwt from 'jsonwebtoken'

const generateJWT = async (data) => {
  const res = await jwt.sign(data, process.env.JWT_SEC, { expiresIn: '1h' })
  return res
}

export default generateJWT
