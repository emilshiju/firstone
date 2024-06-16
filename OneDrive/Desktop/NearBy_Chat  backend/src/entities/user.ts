import { ObjectId } from "mongoose";

export class User{
    constructor(
        public readonly userName:string,
        public readonly dob:string,
        public readonly gender:string,
        public readonly email:string,
        public readonly password:string
    ){}
}



export class findUser{
    constructor(
        public readonly userId:ObjectId,
        // public readonly location:{longitude:number,latitude:number},
        public readonly radius:number
    ){}
}