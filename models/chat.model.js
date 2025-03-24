import mongoose from 'mongoose';

const chatShema = new mongoose.Schema({
   //// sender and receiver
   members:{
    type:[
    {    type:mongoose.Schema.Types.ObjectId,
        ref:'User'}
    ]
   },
lastMessage:{
    type:mongoose.Schema.Types.ObjectId , ref:'Message'
},
unreadMessageCount:{
    type:Number,
    default:0
}
} ,{temestamps:true})

const Chat = mongoose.model('Chat',chatShema)
export default Chat