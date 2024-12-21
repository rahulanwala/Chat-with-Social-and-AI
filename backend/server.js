const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors');

const connectToMongoDB = require('./db/connectToMongoDB')
const authRoutes = require('./routes/auth.route')
const messageRoutes = require('./routes/message.routes')
const userRoutes = require('./routes/user.routes')

const {app,server} = require('./socket/socket.js')
// const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000

app.use(cors());    
app.use(express.json()) // to parse the incoming request with JSON payloads (req.body)
app.use(cookieParser()) // to parse the incoming cookies from the request headers

app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)
app.use('/api/users', userRoutes)

server.listen(PORT, ()=>{
    connectToMongoDB()
    console.log(`Server is running on port ${PORT}`)
})
// app.listen(PORT, ()=>{
//     connectToMongoDB()
//     console.log(`Server is running on port ${PORT}`)
// })