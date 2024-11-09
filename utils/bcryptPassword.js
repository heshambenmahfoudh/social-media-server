import bcrypt from 'bcrypt'

export const bcryptPassword = async (data) => {
  return await bcrypt.hashSync(data, bcrypt.genSaltSync(process.env.SALT | 10))
}

export const comparePassword = async (oldData, currentData) => {
  return await bcrypt.compare(oldData, currentData)
}
