const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
const { getReceiverSocketId,io } = require("../socket/socket");

const sendMessage = async (req, res) => {
    try{
        const {message} = req.body;
        const { id:receiverId } = req.params;
        const senderId = req.user._id;

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

        await Promise.all([conversation.save(), newMessage.save()]); 

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