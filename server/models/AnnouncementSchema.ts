import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
    Img: String,
    Title: String,
    Description: String,
    _uid: String,
    AnnouncedAt: Number,
})

const _Announcement = mongoose.model('announcementModel', AnnouncementSchema)
export default _Announcement;