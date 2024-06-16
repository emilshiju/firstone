import { IUserListInteractor } from "../../interfaces/admin/IUserlistInteractor";

import { inject, injectable } from "inversify";
import { IUserListRepository } from "../../interfaces/admin/IUserlistRepository";
import { INTERFACE_TYPE } from "../../utils/appConst";
import { response } from "express";

@injectable()


export class userListInteractor implements IUserListInteractor{
    private repository:IUserListRepository
    constructor(
        @inject(INTERFACE_TYPE.UserListRepository)repository:IUserListRepository
    ){
        this.repository=repository
    }

    async Igetusers(): Promise<any> {
        
        let allUsers=await this.repository.Rgetusers()

        return allUsers
    }

     async IblockUser(id:string,status:boolean):Promise<boolean> {
    
          

        let response=await this.repository.RblockUser(id,status)

        return response
    }


    async IUsersearch(value:string):Promise<any>{

        let got=await this.repository.RUsersearch(value)
        return got

    }


}