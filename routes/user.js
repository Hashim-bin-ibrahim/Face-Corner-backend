const express = require("express");
const {
  register,
  activateAccount,
  login,
  getProfile,
  updateProfilePicture,
  getUser,
  followReq,
  unFollow,
  addFriend,
  cancelRequest,
  acceptRequest,
  unfriend,
  deleteRequest,
  getFollowers,
} = require("../controllers/user");
const { uploadImages } = require("../controllers/uploadImages");
const { authUser } = require("../middlewares/auth");
const router = express.Router();

router.post("/register", register);
router.post("/activate", activateAccount);
router.post("/login", login);
router.get("/users", getUser);
router.get("/getProfile/:username", authUser, getProfile);
router.put("/updateProfilePicture", authUser, updateProfilePicture);
router.put("/followReq/:id", authUser, followReq);
router.put("/unfollow/:id", authUser, unFollow);
router.put("/addFriend/:id", authUser, addFriend);
router.put("/cancelRequest/:id", authUser, cancelRequest);
router.put("/acceptRequest/:id", authUser, acceptRequest);
router.put("/unfriend/:id", authUser, unfriend);
router.put("/deleteRequest/:id", authUser, deleteRequest);
router.get("/getFollowers", authUser, getFollowers);

module.exports = router;
