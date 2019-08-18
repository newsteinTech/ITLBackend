import express from "express";
import { Services } from "../Services/services";

export class CIController{
    
    public async createCI(req:express.Request,res:express.Response){

        let result = await Services.createCI(req);
        res.send(result);

    }

    public async getCi(req:express.Request,res:express.Response){

        let result = await Services.getCI(req);
        res.send(result);

    }
    

}