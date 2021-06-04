import User from "../models/User";
import Zweet from '../models/Zweet';
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

export const userDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).populate("zweets");
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({
                success: false, 
                error: `Can't find the user that has ${id} id.`
            });
        };
    } catch (error) {
        return res.status(400).json({
            success: false, 
            error: error.message
        });
    };
};

export const userFollow = async (req, res) => {
    const { id } = req.params;
    const { token } = req.headers;
    try {
        const decodedToken = await jwt.decode(token);
        const user = await User.findById(id);
        if (id !== decodedToken.user._id) {
            if (user.followers.includes(decodedToken.user._id)) {
                await User.findByIdAndUpdate(id, {
                    $pull: {
                        followers: decodedToken.user._id
                    }
                });
                await User.findByIdAndUpdate(decodedToken.user._id, {
                    $pull: {
                        following: id
                    }
                });
            } else {
                await User.findByIdAndUpdate(id, {
                    $push: {
                        followers: decodedToken.user._id
                    }
                });
                await User.findByIdAndUpdate(decodedToken.user._id, {
                    $push: {
                        following: id
                    }
                });
            };
            const updatedFollowedUser = await User.findById(id);
            const updatedFollowingUser = await User.findById(decodedToken.user._id);
            return res.status(200).json({
                success: true, 
                message: {
                    followedUser: updatedFollowedUser, 
                    followingUser: updatedFollowingUser
                }
            });
        } else {
            return res.status(409).json({
                success: false, 
                error: "You trying to follow your user with your user."
            });
        };
    } catch (error) {
        return res.status(409).json({
            success: false, 
            error: error.message
        });
    };
};

export const userEdit = async (req, res) => {
    const avatar = req.file;
    const { id } = req.params;
    const { key } = req.headers;
    const { email, name, username, location } = req.body;
    try {
        const oldUser = await User.findById(id);
        const compare = await bcrypt.compare(key, oldUser.password);
        if (compare) {
            await User.findByIdAndUpdate(id, {
                avatar: "/" + avatar.path.split("\\").join("/"), 
                email, 
                name, 
                username, 
                location
            });
            const user = await User.findById(id);
            return res.status(200).json({
                success: true, 
                token: User.getSignedToken({ user })
            });
        } else {
            return res.status(400).json({
                success: false, 
                error: "Key is different."
            });
        };
    } catch (error) {
        return res.status(409).json({
            success: false, 
            error: error.message
        });
    }
};

export const userRemove = async (req, res) => {
    const { id } = req.params;
    const { key } = req.headers;
    try {
        const user = await User.findById(id);
        const compare = await bcrypt.compare(key, user.password);
        if (compare) {
            await User.findByIdAndDelete(id);
            await Zweet.deleteMany({ owner: user._id });
            return res.status(200).json({
                success: true, 
                message: "Successfully delete user."
            });
        } else {
            return res.status(400).json({
                success: false, 
                error: "Key is different."
            });
        };
    } catch (error) {
        return res.status(409).json({
            success: false, 
            error: error.message
        });
    };
};

export const signup = async (req, res) => {
    const avatar = req.file;
    const { email, name, username, password, location } = req.body;
    try {
        const newUser = await User.create({
            avatar: "/" + avatar.path.split("\\").join("/"), 
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
                        token: User.getSignedToken({ user })
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