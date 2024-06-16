import { NextFunction, Request, Response } from "express";

import { inject, injectable } from "inversify";


import { INTERFACE_TYPE } from "../../utils/appConst";

import axios from "axios";
import dotenv from "dotenv"



import { ObjectId } from "mongoose";
import { IConversationInteractor } from "../../interfaces/user/conversation/IConversationInteractor";
import { Conversation } from "../../entities/conversation";

dotenv.config();


@injectable()


export class conversationController{
    private interactor:IConversationInteractor;
    constructor(
        @inject(INTERFACE_TYPE.ConversationInteractor)  interactor:IConversationInteractor
    ){
        this.interactor=interactor
    }


    async  chatRoom(req:Request,res:Response,next:NextFunction){


        try{
        console.log("chat rommmmmmmmmmmm chat rommmmm chat rommmmmmmmmmmmmmmm chat rom mmmmmmmmmmmmmmmmmmmmmmmmm")
            let {id,myid}=req.body
          
           
            const inputs=new Conversation([id,myid])
           
            const response=await this.interactor.IConversation(inputs)
            console.log("pouii0")
            console.log(response)

            return res.json({response})



        }catch(error){

            console.log(error)
        }
    }


    async onCreateChatRoom(req:Request,res:Response,next:NextFunction){
       
        let {id,myid}=req.body
          
           
            const input=new Conversation([id,myid])

            const response=await this.interactor.ICreateChatRoom(input)

            return res.json({response})

    }





}