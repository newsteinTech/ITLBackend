import {Request, Response} from "express";
import { IncidentService } from "../services/incidentService";
import { Actiontype } from "../datamodel/actionType";
import { Authenticate } from "../middleware/authentication";

export class IncidentController{

    public async createIncident(req: Request, res: Response){

        let result = await IncidentService.createIncident(req);
        res.send(result);
    }

    public async updateIncident(req: Request, res: Response){

        let result = await IncidentService.updateIncident(req);
        res.send(result);
    }

    public async getAllIncidents(req: Request, res: Response, next: any){

        /* let permission= await Authenticate.authorize(req, res, next, Actiontype.getAllIncidents);

        if(permission==true){ */
        let result = await IncidentService.getAllIncidents(req);
        res.send(result);
       /*  }
        else{
            res.send("You don't have the right permissions")
        } */

    }

    public async getLastIncident(req: Request, res: Response){

        let result = await IncidentService.getLastIncident(req);
        res.send(result);
    }

    public async getIncidentCountByGroup(req: Request, res: Response){

        let result = await IncidentService.getIncidentCountByGroup(req);
        res.send(result);
    }

    public async getIncidentByAssignedTo(req: Request, res: Response, next: any){

           let result = await IncidentService.getIncidentByAssignedTo(req);
           res.send(result);
    }

    public async pagination(req:Request, res:Response){
        
        let result= await IncidentService.pagination(req);
        res.send(result)
    }
}