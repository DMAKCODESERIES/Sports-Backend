import Event from "../models/event.model.js";
import { CloudinaryUpload } from "../service/Clodinary.upload.js";
export const createEvent = async (req, res) => {
    try {
   
        const { title, description, location, date,participants, time, sportType, organizer,  maxParticipants } = req.body;
       
        const newEvent = new Event({
            title,
            description,
            location,
            date,
            participants,
            time,
            sportType,
            organizer,  
            maxParticipants
        });
        await newEvent.save();
        res.json({ message: "Event created successfully" });
    } catch (error) {
        console.error("Error while creating event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}