const dotenv =require('dotenv')
const axios =require('axios')

const Conversation =require("../models/conversation.model")
const Message =require("../models/message.model")
const { getReceiverSocketId, io } =require("../socket/socket")

dotenv.config()
// Gemini API Config
const GEMINI_URL = process.env.GEMINI_URL
const GEMINI_API_KEY = process.env.GEMINI_API_KEY

if (!GEMINI_URL || !GEMINI_API_KEY) {
    console.error('Missing environment variables. Please check your .env file.')
    process.exit(1) 
}

const sendChatBotOutput = async (req, res) => { 
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({ 
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        // If chatting with bot, generate and save response
        const geminiRes = await axios.post(
            `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{ text: message }]
                }]
            }
        );

        const botResponse = geminiRes.data.candidates[0].content.parts[0].text;

        // Create and save bot's message
        const botMessage = new Message({
            senderId: receiverId, // bot's ID
            receiverId: senderId, // original sender
            message: botResponse,
        });

        if (botMessage) {
            conversation.messages.push(botMessage._id);
        }

        await Promise.all([conversation.save(), botMessage.save()]);

        // Emit bot's response to original sender
        const senderSocketId = getReceiverSocketId(senderId);
        if (senderSocketId) {
            io.to(senderSocketId).emit("newMessage", botMessage);
        }

        res.status(200).json(botMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { sendChatBotOutput };
