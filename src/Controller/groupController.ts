import express from "express";
import { Services } from "../Services/services";
import { Authanticate } from "../Middleware/Authanticate";
import { ActionType } from "../Data Model/Action";


export class groupController{

    public async createGroup(req:express.Request,res:express.Response){

        let result = await Services.createGroup(req);
        res.send(result);

    }

    public async getGroups(req:express.Request,res:express.Response){

        Authanticate.Autharize(req,res,ActionType.createUser);
        let result = await Services.getAllGroups();
        res.send(result);

    }

    public async updateGroup(req:express.Request,res:express.Response){

        let result = await Services.updategroup(req);
        res.send(result);

    }

}