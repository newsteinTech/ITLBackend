import { Router } from "express";
import { UserController } from "../controller/userController";
import { Authenticate } from "../middleware/authentication";

export const userRoutes: Router = Router();

export let userControllerObj= new UserController();

userRoutes.post('/createUser', Authenticate.authenticate, userControllerObj.createUser)
userRoutes.post('/login', userControllerObj.userLogin)
userRoutes.put('/updateUser', userControllerObj.updateUser) //normal user can update only his own details through his dashboard
userRoutes.put('/deleteUser',  userControllerObj.deleteUser)
userRoutes.get('/getAllUsers', Authenticate.authenticate, userControllerObj.getAllUsers)
userRoutes.post('/getUserByUserId', userControllerObj.getUserByUserId)
userRoutes.get('/getLastUser', userControllerObj.getLastUser)
userRoutes.post('/paginate', userControllerObj.pagination)
