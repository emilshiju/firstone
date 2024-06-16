import { IPofileRepository } from "../../interfaces/user/profile/IProfileRepository";
import { INTERFACE_TYPE } from "../../utils/appConst";
import { Container } from "inversify";

// import { IPofileRepository } from "../../interfaces/user/profile/IProfileRepository";

const container=new Container()
const repo=container.get<IPofileRepository>(INTERFACE_TYPE.ProfileRepository)

export class socketHandeler{
    private repository:IPofileRepository;
    constructor(profileRepository: IPofileRepository) {
        this.repository = profileRepository;
    }

    async acceptedRequest(senderId:string,receiverId:string):Promise<any>{

    }



}