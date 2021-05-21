import jwt from "jsonwebtoken";
import Zweet from "../models/Zweet";
import User from "../models/User";

export const zweets = async (req, res) => {
    try {
        const zweets = await Zweet.find({}).sort({ createdAt: "desc" });
        return res.status(200).json(zweets);
    } catch (error) {
        return res.status(404).json({
            success: false, 
            error: error.message
        });
    };
};

export const create = async (req, res) => {
    const { title, description, hashtags } = req.body;
    const { token } = req.headers;
    try {
        const decodedToken = await jwt.decode(token);
        const newZweet = await Zweet.create({
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
        const zweet = await Zweet.findById(id).populate("owner");
        await Zweet.findByIdAndUpdate(id, {
            meta: {
                views: zweet.meta.views + 1
            }
        });
        return res.status(200).json(zweet);
    } catch (error) {
        return res.status(404).json({
            success: false, 
            error: error.message
        });
    };
};

export const edit = async (req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    try {
        await Zweet.findByIdAndUpdate(id, {
            title, 
            description, 
            hashtags: Zweet.formatHashtags(hashtags)
        });
        const updatedZweet = await Zweet.findById(id);
        return res.status(200).json(updatedZweet);
    } catch (error) {
        console.log(error)
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
        const decodedToken = await jwt.decode(token);
        await Zweet.findByIdAndDelete(id);
        await User.findOneAndUpdate({ email: decodedToken.user.email }, {
            $pull: {
                zweets: id
            }
        });
        return res.status(200).json({
            success: true, 
        });
    } catch (error) {
        return res.status(409).json({
            success: false, 
            error: error.message
        });
    };
};