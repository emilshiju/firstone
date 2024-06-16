import { Conversation } from "../../../entities/conversation";







export interface IConversationRepository{
     RConversation(input:Conversation):Promise<any>
     RCreateChatRoom(input:Conversation):Promise<any>
    
}