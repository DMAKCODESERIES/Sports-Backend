import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["team-assignment", "payment", "event-update"] },
    message: String,
    read: { type: Boolean, default: false }
});
const Notification = mongoose.model('Notification',notificationSchema)
export default Notification