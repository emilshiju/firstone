import mongoose, { Schema, model } from "mongoose";

const messageSchema=new Schema(
    {

        content: {
            type: String,
            required: true
          },
          sender: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true  
          },
          chatroom: {
            type: Schema.Types.ObjectId,
            ref: 'chatRoom'
          },
          message:{
            type:String
          },
          timeStamp: {
            type: Date.now(),
            default: Date.now()
          }
    }
    
)

const messageModel=model("message",messageSchema)

export default messageModel

