import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const users = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } catch (error) {
        return res.status(404).json({
            success: false, 
            error: error.message
        });
    }
};

export const signup = async (req, res) => {
    const { email, name, username, password, location } = req.body;
    try {
        const newUser = await User.create({
            email, 
            name, 
            username, 
            password, 
            location
        });
        return res.status(200).json(newUser);
    } catch (error) {
        return res.status(409).json({
            success: false, 
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email && password) {
            const user = await User.findOne({ email });
            if (!user) {
                res.status(404).json({ 
                    success: false, 
                    error: `Cannot find user that has ${email} email.` 
                });
            } else {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    res.status(403).json({ 
                        success: false, 
                        error: "Password doesn't match."
                    });
                } else {
                    res.status(200).json({
                        success: true, 
                        token: User.getSignedToken({ user: user })
                    });
                };
            };
        } else {
            res.status(400).json({ 
                success: false, 
                error: "Email and Password is required." 
            });
        };
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};