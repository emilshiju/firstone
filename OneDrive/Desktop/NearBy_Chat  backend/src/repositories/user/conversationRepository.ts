
import { injectable } from "inversify";
import mongoose,{Schema,model, Types} from "mongoose";

import { Conversation } from "../../entities/conversation";
import chatRoomModel from "../../frameWorks/mongodb/models/chatRoomMode";


import { IConversationRepository } from "../../interfaces/user/conversation/IConversationRepository";
import ProfileModel from "../../frameWorks/mongodb/models/profileModel";



@injectable()
export class conversationRepository implements IConversationRepository{


     async RConversation(input: Conversation): Promise<any> {
          console.log("check chat rommmmmmmmmmmis thereeeeeeeeeeeeeeeeeeeeeeeeee ")
          const [member1, member2] = input.members;
           try{

            const chatroom = await chatRoomModel.findOne({
                members: { $all: [member1, member2] },
              }).exec();

              console.log(chatroom)

              if(!chatroom){

                let profile=await ProfileModel.findById(member1)

                return profile


              }else{

                console.log("else")
              }

          

           }catch(error){
            console.log(error)
           }

        
        return 
    }

   async RCreateChatRoom(input: Conversation): Promise<any> {
    const [member1, member2] = input.members;

      
    const createdRoom = await chatRoomModel.create({
        name: 'New Chat Room',
        members: [member1, member2],
    });

    return createdRoom

        
    }


}