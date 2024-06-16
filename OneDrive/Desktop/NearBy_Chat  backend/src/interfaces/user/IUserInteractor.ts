import {User,findUser} from "../../entities/user"
import { ObjectId } from "mongoose";

export interface IUserInteractor{
    createUser(input:User):Promise<any>
    refreshToken(id:string,username:string):Promise<string>
    IfindUser(input:findUser):Promise<any>
    IcheckEmail(input:string):Promise<boolean>
    IuserLogin(email:string,password:string):Promise<any>
    IadminLogin(email:string,password:string):Promise<any>
    // Igetusers():Promise<any>
    IgoogleLogin(email:string):Promise<any>
    IuserStatus(userId:ObjectId):Promise<boolean>
    IsaveLocation(longitude:any,latitude:any,userId:any):Promise<any>

}