import mongoose from 'mongoose'

const dbConnection = async () => {
  await mongoose.connect(process.env.MONGO_SEC)
  console.log('mongodb connected successfull... :)')
}

export default dbConnection
