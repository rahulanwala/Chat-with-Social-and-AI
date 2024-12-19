const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    }, 
}, { timestamps: true });

// timestamps: true will automatically add createdAt and updatedAt fields in the document

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;