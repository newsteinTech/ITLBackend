import express from "express";
import { Services } from "../Services/services";

export class incidentController{

    public async createIncident(req:express.Request,res:express.Response){

        let result = await Services.createIncident(req);
        res.send(result);

    }

    public async updateIncident(req:express.Request,res:express.Response){

        let result = await Services.updateIncident(req);
        res.send(result);

    }

}