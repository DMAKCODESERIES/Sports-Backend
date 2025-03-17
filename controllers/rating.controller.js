import Rating from "../models/rating.model.js";
import User from "../models/user.model.js";

export const createRating = async (req, res) => {
    try {
        const { ratedBy, ratedUser, score, review } = req.body;

        const user = await User.findById(ratedUser);
        if (!user) {
            return res.status(404).json({ message: "Player not found", success: false });
        }

        if (ratedBy === ratedUser) {
            return res.status(400).json({ message: "You cannot rate yourself", success: false });
        }

        const rating = new Rating({ ratedBy, ratedUser, score, review });
        await rating.save();

        return res.status(201).json({ message: "Rating added successfully", success: true, data: rating });
    } catch (error) {
        console.error("Error creating rating:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

export const getUserRatings = async (req, res) => {
    try {
        const { id } = req.params;
        const ratings = await Rating.find({ ratedUser: id }).populate("ratedBy", "fullname email");

        res.status(200).json({ message: "Ratings fetched successfully", success: true, data: ratings });
    } catch (error) {
        console.error("Error fetching user ratings:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};
