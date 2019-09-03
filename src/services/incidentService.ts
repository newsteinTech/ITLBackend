import {Request, Response} from "express";
import { ResponseModel } from "../helper/responseModel";
import { incidentModel, groupModel } from "../models/Model";
import { userControllerObj } from "routes/userRoutes";


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
            req.body.UpdateDate = Date.now();
           let incident = await incidentModel.findOneAndUpdate({'IncidentNumber': req.body.IncidentNumber}, req.body).exec();
           return ResponseModel.getValidResponse(incident);
        }
        catch(e){
            console.log(e);
            return ResponseModel.getInvalidResponse(e);
        }
    }

    public static async getAllIncidents(req: Request){
        try{
           let allIncidents: any = await incidentModel.find().populate("AssignmentGroup").populate("AssignedTo").exec();     
           return ResponseModel.getValidResponse(allIncidents);
        }
        catch(e){
            console.log(e);
            return ResponseModel.getInvalidResponse(e);
        }
    }

    public static async getIncidentCountByGroup(req: Request){
        try{
           let incidents: any= await incidentModel.find({}).populate("AssignmentGroup").exec();
           let countAssigned: number[]=[0, 0, 0, 0, 0];
           let countResolved: number[]=[0, 0, 0, 0, 0];

           for(let i=0;i<incidents.length;i++){
            if(incidents[i].AssignmentGroup.GroupId=="GroupId1"){
                countAssigned[0]++;
                if(incidents[i].State=='Resolved')
                countResolved[0]++;
            }
            
      
            if(incidents[i].AssignmentGroup.GroupId=="GroupId2"){
                countAssigned[1]++;
                if(incidents[i].State=='Resolved')
                countResolved[1]++;
            }

            if(incidents[i].AssignmentGroup.GroupId=="GroupId3"){
                countAssigned[2]++;
                if(incidents[i].State=='Resolved')
                countResolved[2]++;
            }

            if(incidents[i].AssignmentGroup.GroupId=="GroupId4"){
                countAssigned[3]++;
                if(incidents[i].State=='Resolved')
                countResolved[3]++;
            }

            if(incidents[i].AssignmentGroup.GroupId=="GroupId5"){
                countAssigned[4]++;
                if(incidents[i].State=='Resolved')
                countResolved[4]++;
            }
            
           }
           return ResponseModel.getValidResponse([{"data": countAssigned}, {"data": countResolved}]);
        }
        catch(e){
            console.log(e);
            return ResponseModel.getInvalidResponse(e);
        }
    }

    public static async getIncidentByAssignedTo(req: any){
        try{
           let incidents= await incidentModel.find({'AssignedTo': req.user._id}).populate('AssignmentGroup').populate('AssignedTo').exec();
           return ResponseModel.getValidResponse(incidents);
        }
        catch(e){
            console.log(e);
            return ResponseModel.getInvalidResponse(e);
        }
    }

    public static async getLastIncident(req: any){
        try{
            //get last incident by sorting according to created date in descending order
            let incident: any = await incidentModel.findOne({}).sort({CreatedDate: -1}).limit(1);
            console.log(incident);

            return ResponseModel.getValidResponse(incident);
        }
        catch(e){
            console.log(e);
            return ResponseModel.getInvalidResponse(e);
        }
    }


    public static async pagination(req: Request){

        try{

            let pageNumber: number = req.body.Page;
            let pageSize: number = parseInt(req.body.PageSize); // using parseInt to avoid mongoerror -"limit must be a number"
            //console.log(pageSize)
            let recordsSent: any = await incidentModel.find().populate("AssignmentGroup").populate("AssignedTo").skip((pageNumber-1)*pageSize).limit(pageSize);
            return ResponseModel.getValidResponse(recordsSent);

        }
        catch(err){

            return ResponseModel.getInvalidResponse(err);

        }
    }


}