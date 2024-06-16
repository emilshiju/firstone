import { Profile } from "../../../entities/profile";
import { ObjectId } from "mongoose";

export interface IPofileRepository{

    RcreateProfile(input:Profile):Promise<any>
    RgetProfileUrl(input:any):Promise<any>
    RupdateImageUrl(userId:ObjectId,imageUrl:string):Promise<any>
    RgetNotification(userId:string):Promise<any>
    acceptedRequest(senderId:ObjectId,receiverId:ObjectId,senderProfile:ObjectId,receiverIdProfile:ObjectId):Promise<any>
    connectionRequest(userName:string,senderId:string,receiverId:string,senderProfileId:ObjectId,receiverProfileId:ObjectId):Promise<any>
    RcheckConnectionStatus(userId:ObjectId,receiverId:ObjectId):Promise<boolean>
    // RconnectionNotification(senderName:string,senderId:ObjectId,receiverId:ObjectId):Promise<any>
}