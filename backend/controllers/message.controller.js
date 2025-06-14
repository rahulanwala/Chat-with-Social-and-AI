const dotenv = require('dotenv')
const axios =require('axios');

const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
const { getReceiverSocketId,io } = require("../socket/socket");

// used gemini_bot_id
dotenv.config()
// Gemini API Config
const GEMINI_URL = process.env.GEMINI_URL
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_BOT_ID = process.env.GEMINI_BOT_ID

if (!GEMINI_URL || !GEMINI_API_KEY || !GEMINI_BOT_ID) {
	console.error('Missing environment variables. Please check your .env file.')
	process.exit(1)
}

const sendMessage = async (req, res) => {
    try{
        const {message} = req.body;
        const { id:receiverId } = req.params;
        const senderId = req.user._id;

        // Check if receiver is Gemini bot (using environment variable)
		const isBotChat = receiverId === GEMINI_BOT_ID;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        // await conversation.save();
        // await newMessage.save();
        // to save both conversation and message parallelly use promise.all
        await Promise.all([conversation.save(), newMessage.save()]); 

        // If chatting with bot, generate and save response
		if (isBotChat) {
			// Get Gemini response
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
		}

        // SOCKET IO FUNCTIONALITY WILL GO HERE
        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            // Used to send events to specific client
            io.to(receiverSocketId).emit('newMessage',newMessage);
        }

        res.status(201).json(newMessage);
    }
    catch(error){
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({error: "Server Error"});
    }
}

const getMessages = async (req, res) => {
    try{
        const { id:receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        if(!conversation){
            return res.status(200).json([]);
        }
 
        const messages = conversation.messages;

        res.status(200).json(messages); 
    }
    catch(error){
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({error: "Server Error"});
    }
}

module.exports = {sendMessage, getMessages};

// ***Initial Code***

// const Conversation = require("../models/conversation.model");
// const Message = require("../models/message.model");

// const sendMessage = async (req, res) => {
//     try{
//         const {message} = req.body;
//         const { id:receiverId } = req.params;
//         const senderId = req.user._id;

//         let conversation = await Conversation.findOne({
//             participants: { $all: [senderId, receiverId] }
//         });

//         if(!conversation){
//             conversation = await Conversation.create({
//                 participants: [senderId, receiverId]
//             });
//         }

//         const newMessage = new Message({
//             senderId,
//             receiverId,
//             message
//         });

//         if(newMessage){
//             conversation.messages.push(newMessage._id);
//         }

//         // await conversation.save();
//         // await newMessage.save();

//         // to save both conversation and message parallelly
//         await Promise.all([conversation.save(), newMessage.save()]); 

//         res.status(201).json(newMessage);
//     }
//     catch(error){
//         console.log("Error in sendMessage controller: ", error.message);
//         res.status(500).json({error: "Server Error"});
//     }
// }

// const getMessages = async (req, res) => {
//     try{
//         const { id:receiverId } = req.params;
//         const senderId = req.user._id;

//         let conversation = await Conversation.findOne({
//             participants: { $all: [senderId, receiverId] }
//         }).populate("messages");

//         if(!conversation){
//             return res.status(200).json([]);
//         }
 
//         const messages = conversation.messages;

//         res.status(200).json(messages); 
//     }
//     catch(error){
//         console.log("Error in getMessages controller: ", error.message);
//         res.status(500).json({error: "Server Error"});
//     }
// }

// module.exports = {sendMessage, getMessages};