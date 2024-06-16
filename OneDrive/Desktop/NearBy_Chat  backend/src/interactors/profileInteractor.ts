import { inject, injectable } from "inversify";
import { IProfileInteractor } from "../interfaces/user/profile/IProfileInteractor";
import { IPofileRepository } from "../interfaces/user/profile/IProfileRepository";
import { INTERFACE_TYPE } from "../utils/appConst";
import { Profile } from "../entities/profile";
import { Schema } from "mongoose";



@injectable()
export class ProfileInteractor implements IProfileInteractor{
    private repository:IPofileRepository;
    constructor(
        @inject(INTERFACE_TYPE.ProfileRepository)repository:IPofileRepository
    ){
        this.repository=repository
    }
    
    async IcreateProfile(input: Profile): Promise<any> {
        
        let res=await this.repository.RcreateProfile(input)

        return res
    }

    async IgetProfileUrl(input: any): Promise<string> {

      console.log("second")

        let res=await this.repository.RgetProfileUrl(input)
        
         return res
        
        }
        
       async IupdateImageUrl(userId: Schema.Types.ObjectId, imageUrl: string): Promise<any> {
            
        let data=await this.repository.RupdateImageUrl(userId,imageUrl)
        return data
        }
  


     async IgetNotification(userId:string): Promise<any> {
        
        let respone=await this.repository.RgetNotification(userId)
        return respone
      }

            
     async IcheckConnectionStatus(userId:Schema.Types.ObjectId,receiverId:Schema.Types.ObjectId):Promise<boolean>{

        let response=await this.repository.RcheckConnectionStatus(userId,receiverId)


        return response


     } 

    

}