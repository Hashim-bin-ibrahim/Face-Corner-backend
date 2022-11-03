const { json } = require("stream/consumers");
const Post = require("../models/Post");
const { post } = require("../routes/upload");

exports.createPost = async (req, res) => {
  try {
    const post = await new Post(req.body).save();
    res.json(post);
  } catch (error) {
    console.log("error from create", error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const post = await Post.find()
      .populate("user", "first_name last_name gender picture username ")
      .populate("comments.commentBy", "first_name picture last_name username")
      .sort({ createdAt: -1 });
    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate(
      "user",
      "first_name last_name gender picture username "
    );
    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.uploadComment = async (req, res) => {
  try {
    const { postId, comment, userId } = req.body;
    if (comment.length !== 0) {
      const newComments = await Post.findByIdAndUpdate(
        postId,
        {
          $push: {
            comments: {
              comment: comment,
              commentBy: userId,
            },
          },
        },
        {
          new: true,
        }
      );
      res.json(newComments.comments);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
