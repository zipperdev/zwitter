import jwt from "jsonwebtoken";
import multer from "multer";
import User from "./models/User";

export const tokenVerify = (req, res, next) => {
    const { token } = req.headers;

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            res.status(400).json({
                success: false, 
                error: err
            });
        } else {
            if (decoded) {
                const user = User.findOne({ email: decoded.email });
                if (user) {
                    if (user.password === decoded.password && user._id === decoded._id) {
                        next();
                    } else {
                        res.status(400).json({
                            success: false, 
                            error: "Token is wrong."
                        });
                    };
                } else {
                    res.status(400).json({
                        success: false, 
                        error: "Token is wrong."
                    });
                };
            } else {
                res.status(400).json({
                    success: false, 
                    error: "Please login to go this url."
                });
            };
        }
    });
};

export const tokenIsNull = (req, res, next) => {
    const { token } = req.body;
    
    if (!token) {
        next();
    } else {
        res.status(403).json({
            success: false, 
            error: "Please logout to go this url."
        });
    };
};

export const uploadZweet = multer({ dest: "uploads", limits: {
    fileSize: 10000000
}});