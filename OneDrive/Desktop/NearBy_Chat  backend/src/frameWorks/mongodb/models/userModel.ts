import mongoose,{Schema,model} from "mongoose";

const userSchema=new Schema(
    {
        userName:{
            type:String,
            required:true,
        },
        dob:{
            type:Date,
            required:true
        },
        gender:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        status:{
            type:Boolean,
            default:true
        },
        role:{
            type:String,
            default:'user'
        },  
       
        
    }
)

const UserModel=model("users",userSchema)


export default UserModel