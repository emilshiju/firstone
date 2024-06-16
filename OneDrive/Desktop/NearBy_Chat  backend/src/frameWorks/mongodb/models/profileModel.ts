
import mongoose,{Schema,model, Types} from "mongoose";

const profileSchema=new Schema(
    {
        userId:{
            type:Types.ObjectId,
            required:true,
            ref:"users",
           
        },  
        nickName:{
            type:String
        },
        bio:{
            type:String
        },
        profession:{
            type:String
        },
        imageUrl:{
            type:String,
            default:"https://res.cloudinary.com/dwqtoz0ig/image/upload/v1717497267/nearbychatdemo/okyoyinbjjrenwsx4am3.png"
        },
        connections:[
            {
               userId:{
                    type:Types.ObjectId,
                    ref:"users"
                },
                status:{
                    type:String,
                    default:"pending"
                }
            }
        ]
        
    }
)

const ProfileModel=model('Profiles',profileSchema)

export default ProfileModel