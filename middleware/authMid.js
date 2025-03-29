import jwt from "jsonwebtoken";

export default function authMid(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({error: "Unauthorized1"});
    }
    const tokenString = token.split(' ')[1]; 
    // console.log(tokenString);
    jwt.verify(tokenString, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({error: "Unauthorized2"});
        }
        console.log(decoded);
        req.user_id = decoded.userId;
        next();
    });
}   
