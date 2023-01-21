import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    DatePosted: Number,
    CompletionDate: Number,
    Title: String,
    Description: String,
    _uid: String
})

const _Event = mongoose.model('eventModel', eventSchema)
export default _Event;