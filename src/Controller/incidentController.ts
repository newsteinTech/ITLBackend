import express from "express";
import { Services } from "../Services/services";
import { Authanticate } from "../Middleware/Authanticate";
import { ActionType } from "../Data Model/Action";

export class incidentController{

    public async createIncident(req:express.Request,res:express.Response){

        Authanticate.Autharize(req,res,ActionType.createInc);
        let result = await Services.createIncident(req);
        res.send(result);

    }

    public async updateIncident(req:express.Request,res:express.Response){

        Authanticate.Autharize(req,res,ActionType.updateInc);
        let result = await Services.updateIncident(req);
        res.send(result);

    }

    public async getAllIncident(req:express.Request,res:express.Response){

        Authanticate.Autharize(req,res,ActionType.getInc);
        let result = await Services.getAllIncident();
        res.send(result);

    }

    public async getIncNumber(req:express.Request,res:express.Response){

        
        let result = await Services.getIncNumber();
        res.send(result);

    }

    public async pagiInc(req:express.Request,res:express.Response){

        let result = await Services.pagiInc(req);
        res.send(result);

    }

    public async getIncByNum(req:express.Request,res:express.Response){

        Authanticate.Autharize(req,res,ActionType.getInc);
        let result = await Services.getIncByNumber(req);
        res.send(result);

    }

}