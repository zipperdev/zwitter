import Story from "../models/Story";

export const storys = async (req, res) => {
    try {
        const storys = await Story.find({}).sort({ createdAt: "desc" });
        return res.status(200).json(storys);
    } catch (error) {
        return res.status(404).json({
            success: false, 
            error: error.message
        });
    };
};

export const create = async (req, res) => {
    const { title, description, hashtags } = req.body;
    try {
        const newStory = await Story.create({
            title, 
            description, 
            hashtags: Story.formatHashtags(hashtags)
        });
        return res.status(201).json(newStory);
    } catch (error) {
        return res.status(409).json({
            success: false, 
            error: error.message
        });
    };
};

export const search = async (req, res) => {
    const { keyword } = req.query;
    try {
        const storys = await Story.find({
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
        return res.status(200).json(storys);
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
        const story = await Story.findById(id);
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
        return res.status(409).json({
            success: false, 
            error: error.message
        });
    };
};

export const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await Story.findByIdAndDelete(id);
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