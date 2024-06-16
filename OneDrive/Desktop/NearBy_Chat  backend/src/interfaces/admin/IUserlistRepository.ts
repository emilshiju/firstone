

export interface IUserListRepository{
    Rgetusers():Promise<any>
    RblockUser(id:string,status:boolean):Promise<any>
    RUsersearch(value:string):Promise<any>
}