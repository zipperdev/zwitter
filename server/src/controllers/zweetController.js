import jwt from "jsonwebtoken";
import Zweet from "../models/Zweet";
import User from "../models/User";

export const zweets = async (req, res) => {
    try {
        const zweets = await Zweet.find({}).sort({ views: "desc", like: "desc" });
        return res.status(200).json(zweets);
    } catch (error) {
        return res.status(404).json({
            success: false, 
            error: error.message
        });
    };
};

export const create = async (req, res) => {
    const image = req.file;
    const { title, description, hashtags } = req.body;
    const { token } = req.headers;
    try {
        const decodedToken = await jwt.decode(token);
        const newZweet = await Zweet.create({
            image: "/" + image.path.split("\\").join("/"), 
            title, 
            description, 
            owner: decodedToken.user._id, 
            hashtags: Zweet.formatHashtags(hashtags)
        });
        await User.findOneAndUpdate({ email: decodedToken.user.email }, {
            $push: {
                zweets: newZweet._id
            }
        });
        return res.status(201).json(newZweet);
    } catch (error) {
        console.log(error);
        return res.status(409).json({
            success: false, 
            error: error.message
        });
    };
};

export const search = async (req, res) => {
    const { keyword } = req.query;
    try {
        const zweets = await Zweet.find({
            $or: [
                {
                    title: {
                        $regex: new RegExp(keyword, "i")
                    }
                },
                {
                    description: {
                        $regex: new RegExp(keyword)
                    }
                }, 
                {
                    hashtags: {
                        $regex: new RegExp(keyword)
                    }
                }
            ]
        });
        return res.status(200).json(zweets);
    } catch (error) {
        return res.status(409).json({
            success: false, 
            error: error.message
        });
    };
};

export const zweetDetail =  async(req, res) => {
    const { id } = req.params;
    try {
        const zweet = await Zweet.findById(id).populate("owner").populate("comments.owner");
        await Zweet.findByIdAndUpdate(id, {
            views: zweet.views + 1
        });
        return res.status(200).json(zweet);
    } catch (error) {
        return res.status(404).json({
            success: false, 
            error: error.message
        });
    };
};

export const comment = async (req, res) => {
    const { id } = req.params;
    const { commentId, content } = req.body;
    const { token } = req.headers;
    try {
        const decodedToken = await jwt.decode(token);
        const userId = decodedToken.user._id;
        if (content) {
            await Zweet.findByIdAndUpdate(id, { $push: {
                comments: {
                    owner: userId, 
                    content
                }
            } });
        } else if (commentId) {
            await Zweet.findByIdAndUpdate(id, { $pull: {
                comments: {
                    _id: commentId, 
                    owner: userId, 
                }
            } });
        } else {
            return res.status(400).json({
                success: false, 
                error: "Please write commentId or content for create or delete comment."
            });
        };
        const updatedZweet = await Zweet.findById(id);
        return res.status(200).json(updatedZweet);
    } catch (error) {
        console.log(error);
        return res.status(409).json({
            success: false, 
            error: error.message
        });
    };
};

export const reaction = async (req, res) => {
    const { id } = req.params;
    const { token } = req.headers;
    try {
        const decodedToken = await jwt.decode(token);
        const zweet = await Zweet.findById(id);
        if (zweet.like.includes(decodedToken.user._id)) {
            await Zweet.findByIdAndUpdate(id, {
                $pull: {
                    like: decodedToken.user._id
                }
            });
        } else {
            await Zweet.findByIdAndUpdate(id, {
                $push: {
                    like: decodedToken.user._id
                }
            });
        };
        const updatedZweet = await Zweet.findById(id).populate("owner");
        return res.status(200).json(updatedZweet);
    } catch (error) {
        return res.status(409).json({
            success: false, 
            error: error.message
        });
    };
};

export const edit = async (req, res) => {
    const image = req.file;
    const { id } = req.params;
    const { token } = req.headers;
    const { title, description, hashtags } = req.body;
    try {
        const zweet = await Zweet.findById(id).populate("owner");
        const decodedToken = await jwt.decode(token);
        if (zweet.owner._id == decodedToken.user._id) {
            const lastZweet = await Zweet.findById(id);
            await Zweet.findByIdAndUpdate(id, {
                image: image ? "/" + image.path.split("\\").join("/") : lastZweet.image, 
                title, 
                description, 
                hashtags: Zweet.formatHashtags(hashtags)
            });
            const updatedZweet = await Zweet.findById(id);
            return res.status(200).json(updatedZweet);
        } else {
            return res.status(400).json({
                success: false, 
                error: "You are not person that made this zweet."
            });
        };
    } catch (error) {
        console.log(error);
        return res.status(409).json({
            success: false, 
            error: error.message
        });
    };
};

export const remove = async (req, res) => {
    const { id } = req.params;
    const { token } = req.headers;
    try {
        const zweet = await Zweet.findById(id).populate("owner");
        const decodedToken = await jwt.decode(token);
        if (zweet.owner._id == decodedToken.user._id) {
            await Zweet.findByIdAndDelete(id);
            await User.findOneAndUpdate({ email: decodedToken.user.email }, {
                $pull: {
                    zweets: id
                }
            });
            return res.status(200).json({
                success: true, 
            });
        } else {
            return res.status(400).json({
                success: false, 
                error: "You are not person that made this zweet."
            });
        };
    } catch (error) {
        return res.status(409).json({
            success: false, 
            error: error.message
        });
    };
};