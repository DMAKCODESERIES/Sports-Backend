import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: { type: String },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    sportType: {
        type: String,
        required: true
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    maxParticipants: {
        type: Number,
        required: true
    },
    isCancelled: {
        type: Boolean,
        default: false
    },
    isFinished: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

const Event = mongoose.model("Event", eventSchema);
export default Event;