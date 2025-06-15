const express =require( "express")
const { sendChatBotOutput } =require("../controllers/chatbot.controllers");
const protectedRoute = require("../middlewares/protectedRoute");

const router = express.Router();

router.post("/:id", protectedRoute, sendChatBotOutput);

module.exports = router;

