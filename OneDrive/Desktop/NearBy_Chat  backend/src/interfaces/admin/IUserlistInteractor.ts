
export interface IUserListInteractor{
    Igetusers():Promise<any>
    IblockUser(id:string,status:boolean):Promise<boolean>
    IUsersearch(value:string):Promise<any>
}