import Post from '../Model/PostMod.js'
import User from '../Model/UserMod.js'
import ApiErr from '../utils/apiErr.js'
import { ERR, FAIL, SUCCESS } from '../utils/httpStatus.js'

// CREATE POST
export const createPost = async (req, res, next) => {
  const { userId, description, likes, image } = req.body
  const newPost = await Post.create({ userId, description, likes, image })
  try {
    const savedPost = await newPost.save()

    res.status(200).json({ status: SUCCESS, data: savedPost })
  } catch (err) {
    return next(new ApiErr(ERR, 500, `Failed To Create Post`))
  }
}

// GET POST
export const getPostById = async (req, res, next) => {
  const { id } = req.params
  try {
    const post = await Post.findById(id)
    if (!post) {
      return next(new ApiErr(FAIL, 404, `Post Not Found`))
    }

    res.status(200).json({ status: SUCCESS, data: post })
  } catch (err) {
    return next(new ApiErr(ERR, 500, `Failed to Fetching Post`))
  }
}

// UPDATE POST
export const updatePostById = async (req, res, next) => {
  const { id } = req.params
  const { userId, description, likes, image } = req.body
  try {
    const updatePost = await Post.findByIdAndUpdate(
      id,
      { $set: { userId, description, likes, image } },
      { new: true },
    )

    res.status(200).json({ status: SUCCESS, data: updatePost })
  } catch (err) {
    return next(new ApiErr(ERR, 500, `Failed to Updated Post`))
  }
}

// DELETE POST
export const deletePostById = async (req, res, next) => {
  const { id } = req.params
  try {
    await Post.findByIdAndDelete(id)
    res.status(200).json({ status: SUCCESS, message: 'Post Has Been Deleted' })
  } catch (err) {
    return next(new ApiErr(ERR, 500, `Failed to Deleted Post`))
  }
}

// LIKE AND DISLIKE POST
export const likePost = async (req, res, next) => {
  const { id } = req.params
  const { id: bodyId } = req.body
  try {
    const post = await Post.findById(id)
    if (!post.likes.includes(bodyId)) {
      await post.updateOne({ $push: { likes: bodyId } })
      res.status(200).json({ status: SUCCESS, message: 'Post liked' })
    } else {
      await post.updateOne({ $pull: { likes: bodyId } })
      res.status(200).json({ status: SUCCESS, message: 'Post unliked' })
    }
  } catch (err) {
    return next(new ApiErr(ERR, 500, `Failed to Like Post`))
  }
}

// COLLECTION POSTS WITH FOLLWING
export const collectionPost = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    const userPost = await Post.find({ userId: user._id }).populate('userId')
    const frinds = await Promise.all(
      user.following.map((frind) => {
        return Post.find({ userId: frind }).populate('userId')
      }),
    )
    res.status(200).json({
      status: SUCCESS,
      data: userPost.concat(...frinds).sort((a, b) => {
        return b.createdAt - a.createdAt
      }),
    })
  } catch (err) {
    return next(new ApiErr(ERR, 500, `Failed to Fetching Posts`))
  }
}

export const getPostUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const postUser = await Post.find({ userId: id })
      .sort({ _id: -1 })
      .populate('userId')

    res.status(200).json({ status: SUCCESS, data: postUser })
  } catch (err) {
    return next(new ApiErr(ERR, 500, `Failed to Fetching Posts Of User`))
  }
}
