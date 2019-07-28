import { Router } from "express";
import { UserController } from "../controller/userController";
import { Authenticate } from "../middleware/authentication";

export const userRoutes: Router = Router();

export let userControllerObj= new UserController();

userRoutes.post('/createUser', userControllerObj.createUser)
userRoutes.post('/login', userControllerObj.userLogin)
userRoutes.put('/updateUser', userControllerObj.updateUser)
userRoutes.put('/deleteUser', userControllerObj.deleteUser)
userRoutes.get('/getAllUsers', userControllerObj.getAllUsers)