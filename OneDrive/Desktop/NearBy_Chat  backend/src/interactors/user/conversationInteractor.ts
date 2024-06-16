

import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../../utils/appConst";
import { Schema } from "mongoose";




import { IConversationInteractor } from "../../interfaces/user/conversation/IConversationInteractor";
import { IConversationRepository } from "../../interfaces/user/conversation/IConversationRepository";
import { Conversation } from "../../entities/conversation";



@injectable()

export class conversationInteractor implements IConversationInteractor{

    private repository:IConversationRepository
    constructor(
        @inject(INTERFACE_TYPE.ConversationRepository) repository:IConversationRepository
    ){
        this.repository=repository
    }
    
    async IConversation(input: Conversation): Promise<any> {

        let response=await this.repository.RConversation(input)
        
        return response
    }

    async ICreateChatRoom(input: Conversation): Promise<any> {

        let response=await this.repository.RCreateChatRoom(input)

        return response
        
    }



}