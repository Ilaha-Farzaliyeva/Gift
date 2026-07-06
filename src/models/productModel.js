import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    contact: {
        phone: {
            type: String,
            default: ""
        },
        instagram: {
            type: String,
            default: ""
        }
    },
    price: Number,
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",

    }
});

export const productModel = mongoose.model('Product', productSchema);