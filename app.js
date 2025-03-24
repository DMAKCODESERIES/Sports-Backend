import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userroutes from "./routers/user.routes.js"
import adminroutes from "./routers/admin.routes.js"
import eventroutes from "./routers/event.routes.js"
import chatroutes from "./routers/chat.routes.js"
import messageroutes from "./routers/message.routes.js"
import ratingroutes from "./routers/rating.routes.js"
import categoryroutes from "./routers/catagory.routes.js"
import { createServer } from 'node:http';
import { Server } from 'socket.io';
dotenv.config();
const app=express()
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST","PUT", "DELETE",],
    }
});


app.use(express.json())
app.use(cors()) 
app.use(cookieParser())


app.use("/user",userroutes)
app.use("/admin",adminroutes)
app.use("/event",eventroutes)
app.use("/chat",chatroutes)
app.use("/message",messageroutes)
app.use("/rating",ratingroutes)
app.use("/category",categoryroutes)


app.get("/", (req, res) => {
    res.send("Hello, World!");
});
// io.on("connection", (socket) => {
//     console.log(`User connected: ${socket.id}`);

//     // Handle incoming messages
//     socket.on("chat message", (msg) => {
//         console.log("Message received:", msg);

//         // If msg is an object, extract the "data" field; otherwise, use msg directly
//         const messageText = typeof msg === "object" ? msg.data : msg;

//         if (!messageText) {
//             console.log("Received an empty message.");
//             return;
//         }

//         // Broadcast the message to all connected clients
//         io.emit("chat message", messageText);
//     });

//     // Handle user disconnect
//     socket.on("disconnect", () => {
//         console.log(`User disconnected: ${socket.id}`);
//     });
// });

// export default app
export default server