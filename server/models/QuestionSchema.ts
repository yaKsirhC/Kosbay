import mongoose from "mongoose";


const questionSchema = new mongoose.Schema({
    From: String,
    Title: String,
    Description: String,
    Categories: [String],
    QuestionedAt: Number,
    Replies: [String],
    Resolved: Boolean
})

const _Question = mongoose.model('questionModel', questionSchema)
export default _Question;