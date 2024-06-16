
import { User ,findUser} from "../../entities/user"
import { ObjectId } from "mongoose";

export interface IUserRepository{
    findUser(data:findUser):Promise<any>
    create(data:User):Promise<User>
    RfindEmail(data:string):Promise<boolean>
    RuserLogin(user:string,password:string):Promise<any>
    RadminLogin(email:string,password:string):Promise<any>
    // Rgetusers():Promise<any>
    RgoogleLogin(email:string):Promise<any>
    RuserStatus(userId:ObjectId):Promise<boolean>
    RsaveLocation(longitude:any,latitude:any,userId:any):Promise<any>
}   