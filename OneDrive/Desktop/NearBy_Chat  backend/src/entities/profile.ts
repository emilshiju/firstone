
import { ObjectId } from "mongoose";


export class Profile{
    constructor(
        public readonly userId:ObjectId,
        public readonly nickName:string,
        public readonly bio:string,
        public readonly profession:string,
        public readonly imageUrl:string
    ){}
}