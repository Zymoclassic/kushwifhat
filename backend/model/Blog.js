import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: [ "Uncategorized", "Entertainment", "Education", "Finance", "Technology", "Sport", "Art", "Agriculture", "Politics" ],
        default: "Uncategorized"
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true});

export default mongoose.model("Blog", blogSchema);