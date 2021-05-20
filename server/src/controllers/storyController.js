import jwt from "jsonwebtoken";
import Story from "../models/Story";
import User from "../models/User";

export const stories = async (req, res) => {
    try {
        const stories = await Story.find({}).sort({ createdAt: "desc" });
        return res.status(200).json(stories);
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
        const newStory = await Story.create({
            title, 
            description, 
            owner: decodedToken.user._id, 
            hashtags: Story.formatHashtags(hashtags)
        });
        await User.findOneAndUpdate({ email: decodedToken.user.email }, {
            $push: {
                stories: newStory._id
            }
        });
        return res.status(201).json(newStory);
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
        const stories = await Story.find({
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
        return res.status(200).json(stories);
    } catch (error) {
        return res.status(409).json({
            success: false, 
            error: error.message
        });
    };
};

export const storyDetail =  async(req, res) => {
    const { id } = req.params;
    try {
        const story = await Story.findById(id).populate("owner");
        return res.status(200).json(story);
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
        await Story.findByIdAndUpdate(id, {
            title, 
            description, 
            hashtags: Story.formatHashtags(hashtags)
        });
        const updatedStory = await Story.findById(id);
        return res.status(200).json(updatedStory);
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
        await Story.findByIdAndDelete(id);
        await User.findOneAndUpdate({ email: decodedToken.user.email }, {
            $pull: {
                stories: id
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