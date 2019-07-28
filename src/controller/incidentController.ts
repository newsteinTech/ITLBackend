import {Request, Response} from "express";
import { IncidentService } from "../services/incidentService";

export class IncidentController{

    public async createIncident(req: Request, res: Response){

        let result = await IncidentService.createIncident(req);
        res.send(result);
    }

    public async updateIncident(req: Request, res: Response){

        let result = await IncidentService.updateIncident(req);
        res.send(result);
    }

    public async getAllIncidents(req: Request, res: Response){

        let result = await IncidentService.getAllIncidents(req);
        res.send(result);
    }

    public async getIncidentByGroup(req: Request, res: Response){

        let result = await IncidentService.getIncidentByGroup(req);
        res.send(result);
    }
}