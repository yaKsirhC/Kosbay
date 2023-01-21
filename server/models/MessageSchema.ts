import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    Transmitter: String,
    Recipient: String,
    Content: String,
    SentAt: Number,
    Type: String
})

const _Message = mongoose.model('messageModel', messageSchema)
export default _Message;