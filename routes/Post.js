const express = require("express");
const { createAds, getAllAds } = require("../controllers/Ads");
const {
  createPost,
  getAllPosts,
  uploadComment,
  getReacts,
  getSinglePost,
} = require("../controllers/Post");
const { authUser } = require("../middlewares/auth");
const { route } = require("./upload");

const router = express.Router();

router.post("/createPost", createPost);
router.get("/getAllposts", authUser, getAllPosts);
router.get("/getSinglePost/:postId", getSinglePost);
router.post("/createAds", createAds);
router.get("/getAllAds", getAllAds);
router.put("/uploadComment", uploadComment);

module.exports = router;
