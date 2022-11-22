const express = require("express");
const {
  createMessage,
  getMessage,
  createConversation,
  getConversation,
} = require("../controllers/conversation");
const {} = require("../controllers/conversation");

const router = express.Router();

router.post("/message", createMessage);
router.get("/getMessage/:conversationId", getMessage);
router.post("/conversation", createConversation);
router.get("/getConversation/:userId", getConversation);

module.exports = router;
