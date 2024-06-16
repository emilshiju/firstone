
import { ObjectId } from "mongoose";


export class Conversation{
    constructor(
        public readonly members: ObjectId[]
    ){}
}