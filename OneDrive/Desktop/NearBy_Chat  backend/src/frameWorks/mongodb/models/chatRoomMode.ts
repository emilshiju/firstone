import mongoose, { Schema, model } from "mongoose";

const chatroomSchema = new Schema({
  name: {
    type: String,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "Profiles",
    },
  ],
  createdAt: {  
    type: Date,
    default: Date.now(),
  },
});

const chatRoomModel = model("chatRoom", chatroomSchema);

export default chatRoomModel;
