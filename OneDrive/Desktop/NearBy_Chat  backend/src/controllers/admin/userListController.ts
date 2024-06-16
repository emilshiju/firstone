import { NextFunction, Request, Response } from "express";
import { INTERFACE_TYPE } from "../../utils/appConst";
import { inject, injectable } from "inversify";

import axios from "axios";
import dotenv from "dotenv";
import { IUserListInteractor } from "../../interfaces/admin/IUserlistInteractor";
dotenv.config();

@injectable()
export class UserListController {
  private interactor: IUserListInteractor;
  constructor(
    @inject(INTERFACE_TYPE.UserListInteractor) interactor: IUserListInteractor
  ) {
    this.interactor = interactor;
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    console.log("yes");
    let users = await this.interactor.Igetusers();

    console.log("sodfjso");
    console.log(users);
    return res.json({ data: users });
  }


  async blockUser(req:Request,res:Response,next:NextFunction){

     let {id,status}=req.body
     console.log(id)
       console.log(status)

    let response=await this.interactor.IblockUser(id,status)

    return response
  }



  async searchUsers(req:Request,res:Response,next:NextFunction){
 // @ts-ignore
    let value:string=req.query.value
    console.log(value)

    let users=await this.interactor.IUsersearch(value)

    console.log(users)

    console.log(users)
    
    return res.json({ data: users });


  }
}
