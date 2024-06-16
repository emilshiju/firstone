import express from "express"

import { Container } from "inversify";
import { INTERFACE_TYPE } from "../utils/appConst";
import { IUserListInteractor } from "../interfaces/admin/IUserlistInteractor";
import { userListInteractor } from "../interactors/admin/userListInteractor";
import { IUserListRepository } from "../interfaces/admin/IUserlistRepository";
import { userListRepository } from "../repositories/admin/userListRepository";
import { UserListController } from "../controllers/admin/userListController";

const container=new Container()

container
.bind<IUserListInteractor>(INTERFACE_TYPE.UserListInteractor)
.to(userListInteractor)

container
.bind<IUserListRepository>(INTERFACE_TYPE.UserListRepository)
.to(userListRepository)


container.bind(INTERFACE_TYPE.UserListController).to(UserListController)

const router=express()

const controller=container.get<UserListController>(INTERFACE_TYPE.UserListController)

router.get('/getAllUsers',controller.getAllUsers.bind(controller))


router.patch('/blockUser',controller.blockUser.bind(controller))

router.get('/searchUsers',controller.searchUsers.bind(controller))


export default router