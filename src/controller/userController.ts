import {Request, Response} from "express";
import { UserService } from "../services/userService";
import { Authenticate } from "../middleware/authentication";
import { Actiontype } from "../datamodel/actionType";

export class UserController{

    public async createUser(req: Request, res: Response, next: any){

        /* let permission= await Authenticate.authorize(req, res, next, Actiontype.createUser);
        
        if(permission==true){ 
         */let result = await UserService.createUser(req);
        res.send(result);
        /* }
        else{
            res.send("You don't have the right permissions")
        } */ 

        //once user is created, admin should send userid and password details to the coressponding user via email
    }

    public async updateUser(req: Request, res: Response, next: any){

       // let permission= await Authenticate.authorize(req, res, next, Actiontype.updateUser);
        
        let result = await UserService.updateUser(req);
        res.send(result);
    }

    public async deleteUser(req: Request, res: Response, next: any){

        let permission= await Authenticate.authorize(req, res, next, Actiontype.deleteUser);
        
        if(permission==true){
        let result = await UserService.deleteUser(req);
        res.send(result);
        }
        else{
            res.send("You don't have the right permissions")
        }
    }

    public async getAllUsers(req: Request, res: Response, next: any){
/* 
        let permission= await Authenticate.authorize(req, res, next, Actiontype.getAllUsers);
       
        if(permission==true){  */
        let result = await UserService.getAllUsers(req);
        res.send(result);
      /*   }
        else{
            res.send("You don't have the right permissions")
        } */
    }

    public async getUserByUserId(req: Request, res: Response, next: any){

        let result = await UserService.getUserByUserId(req);
        res.send(result);

    }

    public async getLastUser(req: Request, res: Response, next: any){

        let result = await UserService.getLastUser(req);
        res.send(result);

    }

    public async userLogin(req:Request, res:Response){

        let result= await UserService.userLogin(req, res);
        res.send(result);

    }

    public async pagination(req:Request, res:Response){

      let result= await UserService.pagination(req);
      res.send(result);

    }
}