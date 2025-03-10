// import { getUserProfile, loginUser, logoutUser, registerUser, verifyEmail } from "../controllers/user.controller.js";
// import express from "express";


// const router = express.Router();



// router.post("/register", registerUser);
// router.get("/verify-email/:verificationcode", verifyEmail)
// router.post("/login", loginUser)
// router.post("/logout/:id", logoutUser)
// router.get("/getProfile/:id", getUserProfile)


// export default router; 
import express from "express";
import { 
    getUserProfile, 
    loginUser, 
    logoutUser, 
    registerUser, 
    verifyEmail 
} from "../controllers/user.controller.js";

import { authenticateUser, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.get("/verify-email/:verificationcode", verifyEmail);
router.post("/login", loginUser);

// Protected Routes (Requires Login)
router.post("/logout/:id", authenticateUser, logoutUser);
router.get("/getProfile/:id", authenticateUser, getUserProfile);

// Admin-Only Route
router.get("/admin/dashboard", authenticateUser, authorizeRole(["admin"]), (req, res) => {
    res.json({ message: "Welcome, Admin! This is your dashboard." });
});

// Organizer-Only Route
router.get("/organizer/dashboard", authenticateUser, authorizeRole(["organizer"]), (req, res) => {
    res.json({ message: "Welcome, Organizer! This is your dashboard." });
});

// Player-Only Route
router.get("/player/home", authenticateUser, authorizeRole(["player"]), (req, res) => {
    res.json({ message: "Welcome, Player! This is your home page." });
});

// Visitor-Only Route
router.get("/visitor/home", authenticateUser, authorizeRole(["visitor"]), (req, res) => {
    res.json({ message: "Welcome, Visitor! This is your home page." });
});

export default router;
