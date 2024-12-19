const jwt = require('jsonwebtoken');

const generateTokenandSetCookie = (userId,res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "15d"
    })

    res.cookie('jwt', token, {
        maxAge: 15*24*60*60*1000,
        httpOnly: true, // prevent XSS attack cross site scripting
        sameSite: "strict", // CSRF attack cross site request forgery
        secure: process.env.NODE_ENV !== "development"
    })
};

module.exports = generateTokenandSetCookie;