import Chat from "../models/chat.model.js";


export const createNewchat=async(req,res)=>{
   try {
     const chat =  new Chat(req.body)
     await chat.save();
     res.status(201).send({
        message:"chat created successfully",
        success: true,
        data:chat
     });
   } catch (error) {
       res.status(500).send({
           message: "error while creating chats",
           success: false
       })
    console.log("error while creating new chat",error);
   }
}

export const getChats = async(req,res)=>{
    try {
        const userId = req.user.id; 
        

        if (!userId) {
            return res.status(400).json({ message: "User ID is required", success: false });
        }

        const chats = await Chat.find({ members: { $in: userId } }); 

         res.status(200).send({
             message:"chats fetched successfully",
             success: true,
             data:chats
         });
 
    } catch (error) {
        res.status(500).send({
            message: "error while getting chats",
            success: false
        })
        console.log("error while getting chats",error);
    }
}