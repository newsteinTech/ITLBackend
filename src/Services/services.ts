import express from "express";
import { userModel, groupModel, incidentModel } from "../Model/Model";
import { ResponseModel } from "../Helper/Helper";

export class Services{
    //////////////////// USERS SERVICES \\\\\\\\\\\\\\\\\\\\\
    public static async CreateUser(req:express.Request){

        try{

            let newUser = new userModel(req.body);
            await newUser.save();
            if(req.body.Group.length > 0){

                let group = req.body.Group;
                group.forEach(async (cur:any)=>{

                    console.log(cur);
                    let gr = await groupModel.updateOne(

                        {"_id":cur},
                        {
                            $push:{
                            "GroupMembers":newUser._id
                            }
                        }

                    );
                    // await groupModel.findOne({"_id":cur}).populate({path:'GroupMembers',Model:userModel});
                });



            }
            return ResponseModel.isValidResponse(newUser);

        }catch(err){

            return ResponseModel.isInValidResponse(err);

        }
         
    }

    public static async getUserByUserId(req:express.Request){

        try{

            let user = await userModel.find({
                'UserId':req.body.UserId
            }).populate("Group").exec();

            return ResponseModel.isValidResponse(user);

        }catch(err){

            return ResponseModel.isInValidResponse(err);

        }

    }

    public static async getAllUsers(){

        try{

            let users = await userModel.find({"Active":true});
            return ResponseModel.isValidResponse(users);

        }catch(err){

            return ResponseModel.isInValidResponse(err);

        }

    }

    public static async updateUser(req:express.Request){

        try{

            let updateUser = await userModel.updateOne({
                'UserId':req.body.UserId
            },
            {
                "Name":req.body.Name,
                "Email":req.body.Email,
                "PhoneNo":req.body.PhoneNo,
                "Password":req.body.Password,
                "Role":req.body.Role,
                "Group":req.body.Group,
                "UpdateDate":Date.now()
            });

           if(req.body.Group.length > 0){

            let groups = req.body.Group;
            groups.forEach( async (cur:any)=>{

                // await groupModel.update(
                //     {"GroupMembers":req.body.UserId},
                //     {"GroupMembers":[]}
                // )

            })

           }

            return ResponseModel.isValidResponse(updateUser);

        }catch(err){

            return ResponseModel.isInValidResponse(err);

        }

    }

    public static async deleteUser(req:express.Request){

        try{

            let deleteUser = await userModel.updateOne(
                {
                    'UserId':req.body.UserId
                },
                {
                    $set:{

                        "Active":false,
                        "UpdateDate":Date.now()

                    }
                }
            )

            return ResponseModel.isValidResponse(deleteUser);

        }catch(err){

            return ResponseModel.isInValidResponse(err);

        }

    }

    public static async pagination(req:express.Request){

        try{

            let pageNum:number = req.body.Page;
            // let numOfRec:number = pageNum*5;
            let sk:number = pageNum*5;
            let records = await userModel.find({"Active":true}).skip(sk).limit(5);
            return ResponseModel.isValidResponse(records);


        }catch(err){

            return ResponseModel.isInValidResponse(err);

        }
       
    }

    //////////////////// GROUP SERVICES \\\\\\\\\\\\\\\\\\\\\
    public static async createGroup(req:express.Request){

        try{

            let newGroup = new groupModel(req.body);
            await newGroup.save();
            return ResponseModel.isValidResponse(newGroup);

        }catch(err){

            return ResponseModel.isInValidResponse(err);

        }

    }

    public static async getAllGroups(){

        try{

            let groups = await groupModel.find().populate("GroupMembers");
            return ResponseModel.isValidResponse(groups);

        }catch(err){

            return ResponseModel.isInValidResponse(err);

        }

    }

    public static async updategroup(req:express.Request){

        try{

            let group = await groupModel.updateOne(
                {"GroupId":req.body.GroupId},
                {
                    $set:{

                        "Name":req.body.Name,
                        "Email":req.body.Email,
                        "Manager":req.body.Manager,
                        "GroupMembers":req.body.GroupMembers

                    }
                }
            ).exec();
            return ResponseModel.isValidResponse(group);

        }catch(err){

            return ResponseModel.isInValidResponse(err);

        }

    }
    //////////////////// INCIDENT SERVICES \\\\\\\\\\\\\\\\\\\\\

    public static async createIncident(req:express.Request){

        try{
            
            let newIncident = new incidentModel(req.body);
            await newIncident.save();
            return ResponseModel.isValidResponse(newIncident);

        }catch(err){

            return ResponseModel.isInValidResponse(err);

        }

    }

    public static async updateIncident(req:express.Request){

        try{

            console.log(req.body.IncidentNumber);
            // console.log( await incidentModel.findOne({"IncidentNumber":req.body.IncidentNumber}));
            let result = await incidentModel.updateOne(
                {
                    "IncidentNumber":req.body.IncidentNumber

                },
                {
                    $set:{
                    
                        "Caller":req.body.Caller,
                        "OnBehalfOf":req.body.OnBehalfOf,
                        "Category":req.body.Category,
                        "SubCategory":req.body.SubCategory,
                        "ConfigurationItem":req.body.ConfigurationItem,
                        "State":req.body.State,
                        "Impact":req.body.Impact,
                        "Urgency":req.body.Urgency,
                        "AssignmentGroup":req.body.AssignmentGroup,
                        "AssignedTo":req.body.AssignedTo,
                        "ShortDescription":req.body.ShortDescription,
                        "Description":req.body.Description,
                        "UpdateDate":Date.now()
        
                    }
                }
                
            ).exec();

            return ResponseModel.isValidResponse(result);

        }catch(err){

            return ResponseModel.isInValidResponse(err);

        }

    }

    public static async getAllIncident(){

        try{

            let incidents = await incidentModel.find({}).limit(5)
            .populate("Caller")
            // .populate("ConfigurationItem")
            .populate("AssignmentGroup")
            .populate("AssignedTo");
            return ResponseModel.isValidResponse(incidents);

        }catch(err){

            return ResponseModel.isInValidResponse(err);

        }
        
    }

    public static async getIncNumber(){

        try{

            let incNum = await incidentModel.find({},{IncidentNumber:1,_id:0})
            .sort({IncidentNumber:-1})
            // .limit(1);
            // console.log(incNum);
            return ResponseModel.isValidResponse(incNum);

        }catch(err){

            ResponseModel.isInValidResponse(err);

        }

    }

    public static async pagiInc(req:express.Request){

        try{

            let pageNum:number = req.body.Page;
            // let numOfRec:number = pageNum*5;
            let sk:number = pageNum*5;
            let records = await incidentModel
            .find({"Active":true})
            .skip(sk)
            .limit(5);
            return ResponseModel.isValidResponse(records);


        }catch(err){

            return ResponseModel.isInValidResponse(err);

        }
       
    }

}