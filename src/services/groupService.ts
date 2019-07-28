import { ResponseModel } from "../helper/responseModel";
import { groupModel } from "../models/Model";
import {Request, Response} from "express";

export class GroupService{

    public static async createGroup(req: Request){

        try{
            let newGroup = new groupModel(req.body);
            await newGroup.save();
            return ResponseModel.getValidResponse(newGroup);
        }
        catch(e){
            console.log(e);
        }
    } 

    public static async updateGroup(req: Request){
        try{
           let group = await groupModel.findByIdAndUpdate(req.params.Id, req.body).exec();
           return ResponseModel.getValidResponse(group);
        }
        catch(e){
            console.log(e);
            return ResponseModel.getInvalidResponse(e);
        }
    }

    public static async getAllGroups(req: Request){
        try{
           let allgroups= await groupModel.find().exec();
           return ResponseModel.getValidResponse(allgroups);
        }
        catch(e){
            console.log(e);
            return ResponseModel.getInvalidResponse(e);
        }
    }
}