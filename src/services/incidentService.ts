import {Request, Response} from "express";
import { ResponseModel } from "../helper/responseModel";
import { incidentModel } from "../models/Model";


export class IncidentService{

    public static async createIncident(req: Request){

        try{
            let newIncident = new incidentModel(req.body);
            await newIncident.save();
            return ResponseModel.getValidResponse(newIncident);
        }
        catch(e){
            console.log(e);
        }
    } 

    public static async updateIncident(req: Request){
        try{
           let incident = await incidentModel.findByIdAndUpdate(req.params.Id, req.body).exec();
           return ResponseModel.getValidResponse(incident);
        }
        catch(e){
            console.log(e);
            return ResponseModel.getInvalidResponse(e);
        }
    }

    public static async getAllIncidents(req: Request){
        try{
           let allIncidents= await incidentModel.find().exec();
           return ResponseModel.getValidResponse(allIncidents);
        }
        catch(e){
            console.log(e);
            return ResponseModel.getInvalidResponse(e);
        }
    }

    public static async getIncidentByGroup(req: Request){
        try{
           let incidents= await incidentModel.find({'Assignment Group': req.body.group}).exec();
           return ResponseModel.getValidResponse(incidents);
        }
        catch(e){
            console.log(e);
            return ResponseModel.getInvalidResponse(e);
        }
    }
}