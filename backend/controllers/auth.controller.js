const User = require('../models/user.model')
const bcrypt = require('bcryptjs');
const generateTokenandSetCookie = require('../utils/generateToken');

// used gemini_bot_id
const geminiImg = '../gemini.png';

const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password don't match" })
        }

        const user = await User.findOne({ username });
        if (user) {
            // console.log("User already exists")
            return res.status(400).json({ error: "Username already exists" })
        }

        // HASH the password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: username === "gemini"
                ? geminiImg
                : gender === "male"
                    ? boyProfilePic
                    : girlProfilePic
        })

        if (newUser) {
            // Generate JWT token here
            generateTokenandSetCookie(newUser._id, res);
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        }
    } catch (error) {
        console.log("Error on signup controller", error)
        res.status(500).json({ error: "Server Error" })
    }
}

const login = async (req, res) => {
    // console.log(req.body)
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        const isPasswordMatch = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordMatch) {
            return res.status(400).json({ error: "Invalid username or password" })
        }

        generateTokenandSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });
    }
    catch (error) {
        console.log("Error on login controller", error)
        res.status(500).json({ error: "Server Error" })
    }
}

const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ msg: "Logged out successfully" })
    }
    catch (error) {
        console.log("Error on login controller", error)
        res.status(500).json({ error: "Server Error" })
    }
}

module.exports = { signup, login, logout }
