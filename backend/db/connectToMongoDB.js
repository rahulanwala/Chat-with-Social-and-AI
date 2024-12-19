const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config();

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error to connect MongoDB: ', error.message);
    }
}

module.exports = connectToMongoDB;