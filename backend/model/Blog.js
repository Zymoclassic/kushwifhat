const mongoose = require("mongoose");

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
        enum: [
            "uncategorized", 
            "entertainment", 
            "health", 
            "romance", 
            "education", 
            "finance", 
            "technology", 
            "sport", 
            "art", 
            "agriculture", 
            "politics"
        ],
        default: "uncategorized"
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);
