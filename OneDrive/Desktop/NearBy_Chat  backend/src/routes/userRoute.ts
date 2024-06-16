import express from "express"
import { Container } from "inversify";
import { INTERFACE_TYPE } from "../utils/appConst";
import { IUserRepository } from "../interfaces/user/IUserRepository";
import { UserRepository } from "../repositories/userRepository";
import { IUserInteractor } from "../interfaces/user/IUserInteractor";
import { UserInteractor } from "../interactors/userInteractor";
import { UserController } from "../controllers/userController";
// import 'reflect-metadata';

// import storage from "../frameWorks/cloudinary/cloudinary"

import { verifyAccesToken } from "../services/jwtService";
import { verifyRefreshToken } from "../services/jwtService";


import multer from 'multer';

const storage = multer.diskStorage({})

const upload = multer({storage:storage})

const container=new Container()

container
 .bind<IUserRepository>(INTERFACE_TYPE.UserRepository)
 .to(UserRepository)

container
 .bind<IUserInteractor>(INTERFACE_TYPE.UserInteractor)
 .to(UserInteractor) 
 
container.bind(INTERFACE_TYPE.UserController).to(UserController)

 const router=express.Router()

 const controller=container.get<UserController>(INTERFACE_TYPE.UserController)

 

    
 
 router.post('/register',controller.onCreateUser.bind(controller))

 router.post('/refresh',controller.onRefreshToken.bind(controller))

//  router.post('/login',controller.onLoginUser)

router.post('/findUser',verifyAccesToken,controller.onFindUser.bind(controller))


router.get('/auth/google',controller.googleAuth.bind(controller))

router.get('/auth/google/callback',controller.googleAuthCallback.bind(controller))


router.post('/checkEmail',controller.findEmail.bind(controller))


router.post('/googleLogin',controller.googleLogin.bind(controller))


router.post('/login',controller.login.bind(controller))

router.post('/saveLocation',controller.saveLocation.bind(controller))




router.post('/adminLogin',controller.adminLogin.bind(controller))


// router.get('/getAllUsers',controller.getAllUsers.bind(controller))



router.post('/uploadProfile',upload.single('image'),controller.uploadProfileUser.bind(controller))


router.get('/userStatus',controller.userStatus.bind(controller))


 export default router


