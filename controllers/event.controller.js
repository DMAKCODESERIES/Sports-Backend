import Event from "../models/event.model.js";
import Notification from "../models/notification.model.js";
import { CloudinaryUpload } from "../service/Clodinary.upload.js";
export const createEvent = async (req, res) => {
    try {

        const { title, description, location, date, time, sportType, organizer, maxParticipants } = req.body;

        const newEvent = new Event({
            title,
            description,
            location,
            date,
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



export const registerForEvent = async (req, res) => {
    const { id } = req.params;  
    const { userId } = req.body;
    try {
        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        if (!userId) {
            return res.status(400).json({ message: "User ID is missing in request body" });
        }

        const isRegistered = event.participants.some(
            (player) => player.user.toString() === userId
        );

        if (isRegistered) {
            return res.status(400).json({ message: "Already registered" });
        }
     ////check maximum participants limit
        if (event.participants.length >= event.maxParticipants) {
            return res.status(400).json({ message: "Participant limit is full" });
        }
       
        event.participants.push({
            user: userId,
            paymentStatus: "pending"
        });

        await event.save();

        res.json(event);
    } catch (error) {
        console.log("Error in registering for event", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const assignTeams = async(req,res)=>{
try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const { teams } = req.body;
    const allPlayers = teams.flatMap(team => team.players);
    const uniquePlayers = new Set(allPlayers);
    if (uniquePlayers.size !== allPlayers.length) {
        return res.status(400).json({ message: "Duplicate player assignments" });
    }
    event.teams = teams;
    await event.save();
    teams.forEach(team => {
        team.players.forEach(async playerId => {
            await Notification.create({
                user: playerId,
                type: "team-assignment",
                message: `You've been assigned to ${team.name}`
            });
        });
    });
res.json(event)
} catch (error) {
    console.log("error in assigning teams ",error)
}
}


