import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
    From: {
        type: String, 
        required: true
    },
    Content: String,
    RepliedAt: Number,
    _qid: String
})

const _Reply = mongoose.model('replyModel', replySchema)
export default _Reply;