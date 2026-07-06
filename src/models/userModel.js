import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    role: {
        type: String,
        default: 'user'
    },
    password: String,
    email: String

});

export const userModel = mongoose.model('User', userSchema);