import mongoose from "mongoose";

const zweetschema = mongoose.Schema({
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
            required: true
        }
    ], 
    meta: {
        views: {
            type: Number, 
            default: 0, 
            required: true
        }, 
        like: {
            type: Number, 
            default: 0, 
            required: true
        }, 
        unlike: {
            type: Number, 
            default: 0, 
            required: true
        }
    }
});

zweetschema.static("formatHashtags", function (hashtags) {
    return hashtags.split(",").map((word) => word.trim());
});

const Zweet = mongoose.model("Zweet", zweetschema, "zweets");

export default Zweet;