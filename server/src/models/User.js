import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    avatar: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        unique: true, 
        required: true
    }, 
    username: {
        type: String, 
        maxLength: 80, 
        required: true
    }, 
    name: {
        type: String, 
        maxLength: 80, 
        required: true
    }, 
    createdAt: {
        type: Date, 
        default: Date.now, 
        required: true
    }, 
    password: {
        type: String
    }, 
    location: String, 
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            required: true, 
            ref: "User"
        }
    ], 
    following: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            required: true, 
            ref: "User"
        }
    ], 
    zweets: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Zweet"
        }
    ]
});

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.static("getSignedToken", function (user) {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
});

const User = mongoose.model("User", userSchema, "users");

export default User;