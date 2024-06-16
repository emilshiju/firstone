import mongoose,{Schema,model} from "mongoose";

const adminSchema=new Schema(
    {
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            default:'admin'
        }
    }
)

const AdminModel=model("users",adminSchema)


export default AdminModel