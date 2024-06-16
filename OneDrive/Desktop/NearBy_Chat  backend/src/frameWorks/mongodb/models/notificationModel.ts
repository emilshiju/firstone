

import mongoose,{Schema,model, Types} from "mongoose";

const notificationSchema=new Schema(
    {
        senderId:{
            type:Types.ObjectId,
            required:true,
            ref:"users",
        },
        receiverId:{
            type:Types.ObjectId,
            required:true,
            ref:"users",
        },
        senderProfile:{
            type:Types.ObjectId,
            required:true,
            ref:"Profiles"
        },
        receiverIdProfile:{
            type:Types.ObjectId,
            required:true,
            ref:"Profiles"
        },
        type:{
            type:String,
            required:true
        },
        status:{
            type:String,
            default:"pending"
        },
        message:{
            type:String,
            required:true
        },
        isRead:{
            type:Boolean,
            default:false
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    }
)

const notificationModel=model('notification',notificationSchema)


export default notificationModel