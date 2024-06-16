import { ObjectId } from "mongoose";
import { Profile } from "../../../entities/profile";


export interface IProfileInteractor{

    IcreateProfile(input:Profile):Promise<any>
    IgetProfileUrl(input:any):Promise<any>
    IupdateImageUrl(userId:ObjectId,imageUrl:string):Promise<any>
    IgetNotification(userId:string):Promise<any>
    IcheckConnectionStatus(userId:ObjectId,receiverId:ObjectId):Promise<boolean>
    // IsaveLocation(longitude:any,langitude:any):Promise<any>
    // IconnectionNotification(senderName:string,senderId:ObjectId,receiverId:ObjectId):Promise<any>
}