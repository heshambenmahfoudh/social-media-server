import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
      required: true,
    },
    coverpicture: {
      type: [String],
    },
    profileimage: {
      type: [String],
    },
    about: {
      type: String,
    },
    workat: {
      type: String,
    },
    country: {
      type: String,
    },

    livein: {
      type: String,
    },
    relationship: {
      type: String,
    },
    following: {
      type: [String],
    },
    follwers: {
      type: [String],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

export default mongoose.model('User', userSchema)
