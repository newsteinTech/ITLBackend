import {Request, Response} from "express";
import { GroupService } from "../services/groupService";
import { Authenticate } from "../middleware/authentication";
import { Actiontype } from "../datamodel/actionType";

export class GroupController{

public async createGroup(req: Request, res: Response, next: any){
      let result = await GroupService.createGroup(req);
      res.send(result);

}

public async updateGroup(req: Request, res: Response, next: any){

      let result = await GroupService.updateGroup(req);
      res.send(result);
}

public async getAllGroups(req: Request, res: Response, next: any){
    
       let result = await GroupService.getAllGroups(req);
       res.send(result);
 }
}