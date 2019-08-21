import { Router, Request, Response } from "express";
import { userController } from "../Controller/userController";

export let userRoutes:Router = Router();
let userConObj = new userController();
userRoutes.post("/createUser",userConObj.createUser);
userRoutes.post("/updateUser",userConObj.updateUser);
userRoutes.post("/deleteUser",userConObj.deleteUser);
userRoutes.get("/getAllUsers",userConObj.getAllUsers);
userRoutes.post("/pagi",userConObj.pagination);
userRoutes.post("/getUser",userConObj.getUser);
userRoutes.get("/",((req:Request,res:Response)=>{
    res.send("Hello from userRoutes.");
}))
userRoutes.post("/login",userConObj.login);