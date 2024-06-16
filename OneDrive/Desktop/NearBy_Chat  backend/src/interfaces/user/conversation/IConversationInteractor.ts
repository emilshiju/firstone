import { Conversation } from "../../../entities/conversation";




export interface IConversationInteractor{
   IConversation(input:Conversation):Promise<any>
   ICreateChatRoom(input:Conversation):Promise<any>

    
}