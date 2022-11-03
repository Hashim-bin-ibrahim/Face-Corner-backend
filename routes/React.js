const express = require("express");
const { reactPost, getReacts } = require("../controllers/React");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.put("/reactPost", authUser, reactPost);
router.get("/getReacts/:", authUser, getReacts);

module.exports = router;
