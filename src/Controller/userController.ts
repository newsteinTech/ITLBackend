import express from "express";
import { Services } from "../Services/services";
import { Authanticate } from "../Middleware/Authanticate";
import { ActionType } from "../Data Model/Action";

export class userController{

    public async createUser(req:express.Request,res:express.Response){

        Authanticate.Autharize(req,res,ActionType.createUser);
        let result = await Services.CreateUser(req);
        res.send(result);

    }

    public async getAllUsers(req:express.Request,res:express.Response){

        Authanticate.Autharize(req,res,ActionType.getUser);
        let result = await Services.getAllUsers();
        res.send(result);

    }

    public async getUser(req:express.Request,res:express.Response){

        Authanticate.Autharize(req,res,ActionType.getUser);
        let result = await Services.getUserByUserId(req);
        res.send(result);

    }

    public async updateUser(req:express.Request,res:express.Response){

        Authanticate.Autharize(req,res,ActionType.updateUser);
        let result = await Services.updateUser(req);
        res.send(result);

    }

    public async updateGroup(req:express.Request,res:express.Response){

        let result = await Services.updategroup(req);
        res.send(result);

    }

    public async deleteUser(req:express.Request,res:express.Response){

        Authanticate.Authanticate(req,res,ActionType.deleteUser);
        let result = await Services.deleteUser(req);
        res.send(result);

    }

    public async pagination(req:express.Request,res:express.Response){

        let result = await Services.pagination(req);
        res.send(result);

    }

    public async login(req:express.Request,res:express.Response){
        
        let result = await Services.login(req);
        res.send(result);

    }

}