import { inject, injectable } from "inversify";
import { IUserInteractor } from "../interfaces/user/IUserInteractor";
import { IUserRepository } from "../interfaces/user/IUserRepository";
import { INTERFACE_TYPE } from "../utils/appConst";
import { User,findUser } from "../entities/user";
import bcrypt from 'bcrypt';

import Joi, { Err, string } from 'joi';
import { accessToken,refreshToken, verifyRefreshToken } from "../services/jwtService";
import { Schema } from "mongoose";


const SALT_ROUNDS = 10;
@injectable()
export class UserInteractor implements IUserInteractor{
    private repository:IUserRepository;
    constructor (
        @inject(INTERFACE_TYPE.UserRepository)repository:IUserRepository

    ){
        this.repository=repository  
    }

    async createUser(input:User) {
         let {userName,dob,gender,email,password}=input


         const schema=Joi.object({
            userName:Joi.string().min(3).max(39).required(),
            dob: Joi.date().iso().required(),
            gender: Joi.string().valid('male', 'female', 'other').required(),
            email: Joi.string().email().required(),
           password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
          })
          

        //   const checkEmail=await this.repository.findUser(userName)

        //   console.log(checkEmail)

        //   if(!checkEmail){
            
        //     return false
        //   }

           console.log(SALT_ROUNDS)
           console.log(password)
          password = await bcrypt.hash(password, SALT_ROUNDS);

          
        const data=await this.repository.create({userName,dob,gender,email,password})

        
        const Accesstoken=await  accessToken(data.userName,data.email)
        const RefreshToken=await refreshToken(data.userName)
        console.log(Accesstoken)
       console.log("here        token        toe toenm ekjsefhiusfjosd fjdsiojp           have            aces ")
        
       return   {data,Accesstoken,RefreshToken}
    }


    





     async refreshToken(id:string,username:string): Promise<any> {
           
       
       
           let token =await verifyRefreshToken(id,username)

           console.log("tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
           console.log(token)
           return token

        
        
    }


     async IfindUser(input:findUser): Promise<any> {

     console.log("a m hereeeeeeeeeeeee at inteeeeteractor rrrrrrrrrrr")
     
        const users=await this.repository.findUser(input)
        
        return users

    }

   async  IcheckEmail(input: string): Promise<boolean> {
            
         let userIsThere= await this.repository.RfindEmail(input)

        return userIsThere
    }




    async IuserLogin(email:string,password:string){
     console.log(" i suer login")
     console.log(email)

        let ifUser=await this.repository.RuserLogin(email,password)

        if(ifUser){
          

            const AccessToken=await  accessToken(ifUser.userName,ifUser.email)
        const RefreshToken=await refreshToken(ifUser.userName)

        
       return   {ifUser,AccessToken,RefreshToken}

        }

        return false

    }

     async  IadminLogin(email: string, password: string): Promise<any> {
        
        let ifAdmin=await this.repository.RadminLogin(email,password)

        return ifAdmin
    }


    //  async Igetusers(): Promise<any> {
        
    //     let allUsers=await this.repository.Rgetusers()

    //     return allUsers
    // }



     async IgoogleLogin(email: string): Promise<any> {
        

        let data=await this.repository.RgoogleLogin(email)



        let Accesstoken=await accessToken(data.userName,email)
      const RefreshToken=await refreshToken(data.userName)

      return {data,Accesstoken,RefreshToken}

    }
    
    async IuserStatus(userId: Schema.Types.ObjectId): Promise<boolean> {

        let response=await this.repository.RuserStatus(userId)
        return true
    }

     async IsaveLocation(longitude: any, latitude: any,userId:any): Promise<any> {

        let response=await this.repository.RsaveLocation(longitude,latitude,userId)
        
    }


}





