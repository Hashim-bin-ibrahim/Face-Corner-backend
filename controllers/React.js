const React = require("../models/React");
const mongoose = require("mongoose");
exports.reactPost = async (req, res) => {
  try {
    const { postId, react } = req.body;
    const check = await React.findOne({
      postRef: postId,
      reactBy: mongoose.Types.ObjectId(req.user.id),
    });
    if (check == null) {
      // console.log("ee postin ee user react cheythittilaa...");
      const newReact = new React({
        react: react,
        postRef: postId,
        reactBy: req.user.id,
      });
      await newReact.save();
    } else {
      if (check.react == react) {
        //console.log("ee user same react aan cheyyan nookunnath...");
        await React.findByIdAndRemove(check._id);
      } else {
        // console.log("ee user different react aan cheyyan nookunnath...");
        await React.findByIdAndUpdate(check._id, {
          react: react,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getReacts = async (req, res) => {
  try {
    const Reacts = await React.find({ postRef: req.params.id });
    res.json({ Reacts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
