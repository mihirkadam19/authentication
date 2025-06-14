import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.jwt;
    
    if (!token) return res.status(400).json({success: false, message: "Unauthorized - no token provided"})
    try{
        
        // decoding the jwt using the secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) return res.status(400).json({success: false, message: "Unauthorized - invalid token"})
        
        // adding userId field to the req from the decoded jwt
        req.userId = decoded.userId

        // execute the next function
        next()

    } catch(error){
        console.log("Could not verify token", error);
        return res.status(500).json({success:false, message:"Server Error"});
    }
};
