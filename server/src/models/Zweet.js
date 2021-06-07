import mongoose from "mongoose";

const zweetschema = mongoose.Schema({
    image: {
        type: String, 
        required: true
    }, 
    title: {
        type: String, 
        trim: true, 
        maxLength: 100, 
        required: true
    }, 
    description: {
        type: String, 
        trim: true, 
        maxLength: 1400, 
        required: true
    }, 
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "User"
    }, 
    createdAt: {
        type: Date, 
        default: Date.now, 
        required: true
    }, 
    hashtags: [
        { 
            type: String, 
            trim: true, 
            maxLength: 300, 
            required: true
        }
    ], 
    comments: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId, 
                required: true, 
                auto: true
            }, 
            owner: {
                type: mongoose.Schema.Types.ObjectId, 
                required: true, 
                ref: "User"
            }, 
            content: {
                type: String, 
                trim: true, 
                maxLength: 300, 
                required: true
            }, 
            createdAt: {
                type: Date, 
                default: Date.now, 
                required: true
            }
        }
    ], 
    views: {
        type: Number, 
        default: 0, 
        required: true
    }, 
    like: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            equired: true, 
            ref: "User"
        }
    ]
});

zweetschema.static("formatHashtags", function (hashtags) {
    return hashtags.split(",").map((word) => word.trim());
});

const Zweet = mongoose.model("Zweet", zweetschema, "zweets");

export default Zweet;