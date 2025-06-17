import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "4d" });
    
    // set cookie by modifying the response object
    res.cookie("jwt", token, {
        httpOnly: true, // prevent XSS attacks by preventing access to the cookie from JavaScript
        secure: process.env.NODE_ENV === "production", // only send cookie over HTTPS in production
        maxAge: 4 * 24 * 60 * 60 * 1000, // 4 days
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
    });

    return token;
};