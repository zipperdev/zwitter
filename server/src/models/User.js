import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    email: {
        type: String, 
        unique: true, 
        required: true
    }, 
    username: {
        type: String, 
        required: true
    }, 
    name: {
        type: String, 
        required: true
    }, 
    password: {
        type: String
    }, 
    location: String, 
    storys: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:" Story"
        }
    ]
});

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 5);
});

userSchema.static("getSignedToken", function (user) {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
});

const User = mongoose.model("User", userSchema, "users");

export default User;