import mongoose from 'mongoose'

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,ref:"User",
      required: true,
    },
    description: {
      type: String,
    },
    likes: {
      type: [String],
    },
    image: {
      type: [String],
    },
  },
  { timestamps: true },
)

export default mongoose.model('Post', postSchema)
