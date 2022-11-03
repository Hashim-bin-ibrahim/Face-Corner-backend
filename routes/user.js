const express = require("express");
const {
  register,
  activateAccount,
  login,
  getProfile,
  updateProfilePicture,
  getUser,
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

module.exports = router;
