import { IUserListRepository } from "../../interfaces/admin/IUserlistRepository";
import { injectable } from "inversify";
import UserModel from "../../frameWorks/mongodb/models/userModel";
import ProfileModel from "../../frameWorks/mongodb/models/profileModel";


@injectable()



export class userListRepository implements IUserListRepository{

    async Rgetusers(): Promise<any> {
    
        let allUsers=await ProfileModel.find().populate('userId')
    
        return allUsers
      }

       async RblockUser(id:string,status:boolean): Promise<boolean> {
        // type InputType = {
        //     Id:string;
        //     status: string;
        //   };
          
        //   const { Id, status }: InputType = input;
        let s
        console.log(id)
        console.log(status)
        console.log("lasttttttttttt")
         if(status){
            console.log("I")
         s=await UserModel.findByIdAndUpdate(id,
            {$set:{status:false}},
            {new:true}
        )
    
         }else{
            console.log("j")
           s= await UserModel.findByIdAndUpdate(id,
                {$set:{status:true}},
                {new:true}
            )
         }
         console.log(s)
        return true
      }
    


      async RUsersearch(value:string){

         const regex = new RegExp(value, 'i'); 

         const results = await ProfileModel.find({nickName: { $regex: regex } }).populate('userId')
           console.log("searching aneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
         console.log(results)
         return results


      }
}
