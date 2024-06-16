import express from "express"
import { Container } from "inversify";

const container=new Container()

import { INTERFACE_TYPE } from "../utils/appConst";
import { IConversationInteractor } from "../interfaces/user/conversation/IConversationInteractor";
import { conversationInteractor } from "../interactors/user/conversationInteractor";
import { IConversationRepository } from "../interfaces/user/conversation/IConversationRepository";
import { conversationRepository } from "../repositories/user/conversationRepository";
import { conversationController } from "../controllers/user/conversationController";


container
.bind<IConversationInteractor>(INTERFACE_TYPE.ConversationInteractor).to(conversationInteractor)

container
.bind<IConversationRepository>(INTERFACE_TYPE.ConversationRepository).to(conversationRepository)


container.bind(INTERFACE_TYPE.ConversationController).to(conversationController)




const controller=container.get<conversationController>(INTERFACE_TYPE.ConversationController)

const route=express.Router()


route.post('/getSingleChat',controller.chatRoom.bind(controller))

route.post('/createChatRoom',controller.onCreateChatRoom.bind(controller))



export default route











