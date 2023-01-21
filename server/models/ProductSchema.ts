import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    CreatedAt: Number,
    Title: String,
    Description: String,
    Imgs: [String],
    Price: Number,
    Categories: [String],
    Owner: mongoose.Schema.Types.Mixed,
    Sold: Boolean
})

const _Product = mongoose.model('productModel', productSchema)
export default _Product;