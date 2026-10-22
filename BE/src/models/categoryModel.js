import mongoose, { Schema } from "mongoose";
const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    }
});

export const categoryModel = mongoose.model("Category", categorySchema);