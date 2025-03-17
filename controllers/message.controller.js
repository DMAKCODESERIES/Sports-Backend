import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

export const createMessage = async (req, res) => {
    try {
        const chat = await Chat.findById(req.body.chatId);

        if (!chat) {
            return res.status(404).json({
                message: "Chat not found",
                success: false
            });
        }

        const message = new Message(req.body);
        await message.save();

        await Chat.findByIdAndUpdate(
            req.body.chatId,
            {
                lastMessage: message._id,
                $inc: { unreadMessageCount: 1 }
            },
            { new: true } 
        );

        res.status(200).json({
            message: "Message created successfully",
            success: true,
            data: message
        });

    } catch (error) {
        console.error("Error while creating message:", error);
        res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
};


export const getMessages = async (req, res) => {
    try {
        
        const allMessages= await Message.find({chatId: req.params.chatId}).sort({createAt:1})
       
        res.status(200).send({ message: "successfully fetched all messages", data: allMessages, success: true});
    } catch (error) {
        res.status(500).send({
            message: "Server Error",
            success: false
        })
        console.log("error while getting messages", error);
    }
}
