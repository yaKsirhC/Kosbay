import mongoose from 'mongoose'

const pendingUserSchema = new mongoose.Schema({
    Email: String,
    Password: String,
    PendCode: Number,
    Name: String
})

const _PendingUser = mongoose.model('pendingUser', pendingUserSchema)
export default _PendingUser