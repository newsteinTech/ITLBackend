import express from "express";
import { userModel, groupModel, incidentModel } from "../Model/Model";
import { ResponseModel } from "../Helper/Helper";

export class Services{

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
            });

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

    public static async createGroup(req:express.Request){

        try{

            let newGroup = new groupModel(req.body);
            await newGroup.save();
            return ResponseModel.isValidResponse(newGroup);

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

    public static async createIncident(req:express.Request){

        try{

            let newIncident = await new incidentModel(req.body);
            return ResponseModel.isValidResponse(newIncident);

        }catch(err){

            return ResponseModel.isInValidResponse(err);

        }

    }

    public static async updateIncident(req:express.Request){

        try{

            let result = incidentModel.update(
                {
                    "IncidentNumber":req.body.incNum
                },
                {
                    $set:{
                    
                        "Caller":req.body.Caller,
                        "OnBehalfOf":req.body.OnBehalfOf,
                        "Category":req.body.Category,
                        "SubCategory":req.body.SubCategory,
                        "ConfigurationItem":req.body.CI,
                        "State":req.body.State,
                        "Impact":req.body.Impact,
                        "Urgency":req.body.Urgency,
                        "AssignmentGroup":req.body.AG,
                        "AssignedTo":req.body.AT,
                        "ShortDescription":req.body.SD,
                        "Description":req.body.Des,
                        "UpdateDate":Date.now()
        
                    }
                }
                
            ).exec();

            return ResponseModel.isValidResponse(result);

        }catch(err){

            return ResponseModel.isInValidResponse(err);

        }

    }

}