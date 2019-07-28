import {Request, Response} from "express";
import { UserService } from "../services/userService";
import { Authenticate } from "../middleware/authentication";
import { Actiontype } from "../datamodel/actionType";

export class UserController{

    public async createUser(req: Request, res: Response, next: any){

        //let permission= await Authenticate.authorize(req, res, next, Actiontype.createUser);
        
          let result = await UserService.createUser(req);
          res.send(result);

        //once user is created, admin should send userid and password details to the coressponding user via email
    }

    public async updateUser(req: Request, res: Response, next: any){

       // let permission= await Authenticate.authorize(req, res, next, Actiontype.updateUser);
        
          let result = await UserService.updateUser(req);
          res.send(result);
    }

    public async deleteUser(req: Request, res: Response, next: any){

      //  let permission= await Authenticate.authorize(req, res, next, Actiontype.deleteUser);
        
          let result = await UserService.deleteUser(req);
          res.send(result);
    }

    public async getAllUsers(req: Request, res: Response, next: any){

       // let permission= await Authenticate.authorize(req, res, next, Actiontype.getAllUsers);
       
          let result = await UserService.getAllUsers(req);
          res.send(result);
    }

    public async userLogin(req:Request, res:Response){
        let result= await UserService.userLogin(req);
         res.send(result)
     }
}