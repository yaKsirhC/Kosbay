import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    JoinedAt: Number,
    IsSuper: Boolean,
    Name: String,
    Email: String,
    Password: String,
    ImgBanner: String,
    Followers: [String],
    Followed: [String],
    Conversations:[String],
    Products:[String],
    Announcements: [String],
    Events: [String]

})

const _User = mongoose.model('userModel', userSchema)
export default _User;