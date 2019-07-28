import express from "express";
import { Services } from "../Services/services";

export class userController{

    public async createUser(req:express.Request,res:express.Response){

        let result = await Services.CreateUser(req);
        res.send(result);

    }

    public async getAllUsers(req:express.Request,res:express.Response){

        let result = await Services.getAllUsers();
        res.send(result);

    }

    public async getUser(req:express.Request,res:express.Response){

        let result = await Services.getUserByUserId(req);
        res.send(result);

    }

    public async updateUser(req:express.Request,res:express.Response){

        let result = await Services.updateUser(req);
        res.send(result);

    }

    public async updateGroup(req:express.Request,res:express.Response){

        let result = await Services.updategroup(req);
        res.send(result);

    }

    public async deleteUser(req:express.Request,res:express.Response){

        let result = await Services.deleteUser(req);
        res.send(result);

    }

    public async pagination(req:express.Request,res:express.Response){

        let result = await Services.pagination(req);
        res.send(result);

    }

}