import { NextFunction, Request, Response } from "express";

import { inject, injectable } from "inversify";


import { INTERFACE_TYPE } from "../utils/appConst";

import axios from "axios";
import dotenv from "dotenv"
import { IProfileInteractor } from "../interfaces/user/profile/IProfileInteractor";
import { ObjectId } from "mongoose";
dotenv.config();

@injectable()
export class profileController{
    private interactor:IProfileInteractor;
    constructor(
        @inject(INTERFACE_TYPE.ProfileInteractor) interactor:IProfileInteractor
    ){
        this.interactor=interactor
    }

    async onSubmitProfile(req:Request,res:Response,next:NextFunction){

        try{
            let input=req.body

            console.log(input)
            let response=await this.interactor.IcreateProfile(input)
            if(response){
                return res.json({status:true}).status(200)
            }
            

        }catch(error){
            console.log(error)
        }
    }

    async  getProfileUrl(req:Request,res:Response,next:NextFunction){
        try{

            console.log("skdjfhshfius")
   
            let input=req.params.userId
            console.log("ininput")
            console.log(input)
           
            let response=await this.interactor.IgetProfileUrl(input)
            console.log("user profile")
            console.log(response)
            console.log("output")
            if(!response){
                return res.json({status:false})
            }

            return res.json({status:true,response})

        }catch(error){
            console.log(error)
        }
    }

    

    async updateImageUrl(req:Request,res:Response,next:NextFunction){

        try{

            let {userId,imageUrl}=req.body
            console.log(req.body)

            let response=await this.interactor.IupdateImageUrl(userId,imageUrl)
                console.log("its    reeeeeeeeeeeeeeeeeeeesponseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
                console.log(response)
            return res.json({status:true,response})

        }catch(error){
            console.log(error)
        }
    }
    


    async getAllNotification(req:Request,res:Response,next:NextFunction){

        const  userId=req.params.userId

        console.log("vanuuuuu")
      
            //@ts-ignore
        let senderName=req?.user?.username
        try{

            const response=await this.interactor.IgetNotification(userId)
                console.log(response)
            return res.json({status:true,allNotification:response})

        }catch(error){
            
            console.log(error)
        }
        return 
    }

    async checkConnectionStatus(req:Request,res:Response,next:NextFunction){

        try{

            const userId:any=req.query.userId
            const receiverId:any=req.query.id
            console.log("sjfksdjfsdhfishfsdhfjhsdjfhsdjfhdsjfhdskjhfdskjfhkjds")
            console.log(userId,receiverId)

            const response=await this.interactor.IcheckConnectionStatus(userId,receiverId)

            return res.json({status:response})



          }catch(error){
            console.log(error)
        }
    }


}