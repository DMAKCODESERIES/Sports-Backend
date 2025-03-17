import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userroutes from "./routers/user.routes.js"
import adminroutes from "./routers/admin.routes.js"
import eventroutes from "./routers/event.routes.js"
import chatroutes from "./routers/chat.routes.js"
import messageroutes from "./routers/message.routes.js"
import raringroutes from "./routers/rating.routes.js"

dotenv.config();
const app=express()



app.use(express.json())
app.use(cors()) 
app.use(cookieParser())



app.use("/user",userroutes)
app.use("/admin",adminroutes)
app.use("/event",eventroutes)
app.use("/chat",chatroutes)
app.use("/message",messageroutes)
app.use("/rating",raringroutes)

export default app