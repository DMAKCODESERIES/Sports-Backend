import Event from "../models/event.model.js";
import Notification from "../models/notification.model.js";

// Create a new event
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
            maxParticipants,
        });

        await newEvent.save();
        res.json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        console.error("Error while creating event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Register for an event
export const registerForEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        if (!userId) return res.status(400).json({ message: "User ID is required" });

        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        // Check if user is already registered
        if (event.participants.some(player => player.user.toString() === userId)) {
            return res.status(400).json({ message: "Already registered" });
        }

        // Check max participant limit
        if (event.participants.length >= event.maxParticipants) {
            return res.status(400).json({ message: "Participant limit is full" });
        }

        event.participants.push({ user: userId, paymentStatus: "pending" });
        await event.save();

        res.json({ message: "Registered successfully", event });
    } catch (error) {
        console.error("Error in registering for event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Assign teams to an event
export const assignTeams = async (req, res) => {
    try {
        const { id } = req.params;
        const { teams } = req.body;

        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        // Ensure no duplicate player assignments
        const allPlayers = teams.flatMap(team => team.players);
        if (new Set(allPlayers).size !== allPlayers.length) {
            return res.status(400).json({ message: "Duplicate player assignments" });
        }

        event.teams = teams;
        await event.save();

        // Notify players about team assignment
        await Promise.all(
            teams.flatMap(team =>
                team.players.map(playerId =>
                    Notification.create({
                        user: playerId,
                        type: "team-assignment",
                        message: `You've been assigned to ${team.name}`,
                    })
                )
            )
        );

        res.json({ message: "Teams assigned successfully", event });
    } catch (error) {
        console.error("Error in assigning teams:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all events
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get upcoming events
export const getUpcomingEvents = async (req, res) => {
    try {
        const currentDate = new Date();
        const events = await Event.find({ date: { $gte: currentDate }, isFinished: false });

        res.json(events);
    } catch (error) {
        console.error("Error fetching upcoming events:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get past events
export const getPastEvents = async (req, res) => {
    try {
        const currentDate = new Date();
        const events = await Event.find({ date: { $lt: currentDate } });

        res.json(events);
    } catch (error) {
        console.error("Error fetching past events:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Mark an event as finished
export const finishEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        event.isFinished = true;
        await event.save();

        res.json({ message: "Event marked as finished", event });
    } catch (error) {
        console.error("Error finishing event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete an event
export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        await Event.findByIdAndDelete(id);
        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
