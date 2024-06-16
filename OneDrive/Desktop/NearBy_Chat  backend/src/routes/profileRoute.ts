import express from "express"
import { Container } from "inversify";
import { IProfileInteractor } from "../interfaces/user/profile/IProfileInteractor";

import { INTERFACE_TYPE } from "../utils/appConst";
import { ProfileInteractor } from "../interactors/profileInteractor";
import { IPofileRepository } from "../interfaces/user/profile/IProfileRepository";
import { ProfileRepository } from "../repositories/profileRepository";
import { profileController } from "../controllers/profileController";
import { verifyAccesToken } from "../services/jwtService";




const container=new Container()


container
.bind<IProfileInteractor>(INTERFACE_TYPE.ProfileInteractor).to(ProfileInteractor)

container
.bind<IPofileRepository>(INTERFACE_TYPE.ProfileRepository).to(ProfileRepository)



container.bind(INTERFACE_TYPE.ProfileController).to(profileController)

const route=express.Router()
const controller=container.get<profileController>(INTERFACE_TYPE.ProfileController)


route.post('/submitProfile',controller.onSubmitProfile.bind(controller))


route.get('/getProfile/:userId',controller.getProfileUrl.bind(controller))


route.patch('/updateImageUrl',controller.updateImageUrl.bind(controller))


route.get('/getAllNotification/:userId',verifyAccesToken,controller.getAllNotification.bind(controller))

route.get('/checkConnectionStatus',controller.checkConnectionStatus.bind(controller))

export { container }; // Exporting container as a named export

// Exporting route as default export
export default route;