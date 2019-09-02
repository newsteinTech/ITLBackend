import express from "express";
import { userModel, groupModel, incidentModel, CIModl} from "../Model/Model";
import { ResponseModel } from "../Helper/Helper";
import { incPagi } from "../Helper/inc";
import *as jwt from 'jsonwebtoken';

export class Services{
    //////////////////// USERS SERVICES \\\\\\\\\\\\\\\\\\\\\
    public static async CreateUser(req:express.Request){

        try{

            let newUser = new userModel(req.body);
            await newUser.save();
            
            if(req.body.Group != undefined ){
                
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
                    
                });



            }
           
            return ResponseModel.isValidResponse(newUser);

        }catch(err){

            console.log(err);
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

     /////////////// LOGIN USER \\\\\\\\\\\\\\\\
    
     public static async login(req:express.Request){

        try{

            let user:any = await userModel.findOne({Email:req.body.Email});
            if(user){

                if(user.Password == req.body.Password){

                    let signInOptions:jwt.SignOptions = {

                        "expiresIn":"12h"

                    }

                    let secret = "secret";

                    let payLoad = {

                        "Email":user.Email,
                        "Role":user.Role,
                        "Name":user.Name,
                        "UserId":user.UserId

                    }

                    let token = await jwt.sign(payLoad,secret,signInOptions);
                    return ResponseModel.isValidResponse(token);

                }else{

                    return ResponseModel.isInValidResponse("Wrong Password");

                }

            }else{

                return ResponseModel.isInValidResponse("User Doesn't exist.");

            }

        }catch(err){

            console.log(err);

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
            
            let newIncident:any = new incidentModel(req.body);
            console.log(req.body);
            await newIncident.save();
            console.log(newIncident.sla);
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
            .populate("AssignmentGroup")
            .populate("AssignedTo");
            // .populate("ConfigurationItem");
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

        let q1 = async function(skp:number){

            let records:any = await incidentModel
                .find({})
                .skip(skp)
                .limit(5)
                .populate('AssignmentGroup')
                .populate('Caller')
                .populate('AssignedTo')
               // .populate('ConfigurationItem');
            return records;
            
        }
        try{
            
            if(req.body.type == 0){
                
               
                let records = await q1(0); 
                let nuOfRec = await incidentModel.countDocuments();
                let inc = new incPagi(records,nuOfRec);
                return ResponseModel.isValidResponse(inc);

            }else if(req.body.type == 1){

                let pageNum:number = req.body.Page;
                let numOfRec:number = pageNum*5;
                let sk:number = pageNum*5;
                let records = await q1(sk);
                let inc = new incPagi(records,0);
                return ResponseModel.isValidResponse(inc);

            }

        }catch(err){

            return ResponseModel.isInValidResponse(err);

        }
       
    }

    public static async getIncByNumber(req:express.Request){

        try{
            
            let record = await incidentModel.findOne({IncidentNumber:req.body.Number})
            .populate('AssignmentGroup')
            .populate('Caller')
            .populate('AssignedTo');
            // .populate('ConfigurationItem');
            return ResponseModel.isValidResponse(record);

        }catch(err){

            return ResponseModel.isInValidResponse(err);

        }

    }

    /////////////////// CONFIGURATION ITEM \\\\\\\\\\\\\\\\
    
    public static async createCI(req:express.Request){

        try{
            
            let record = new CIModl(req.body);
            await record.save();
            return ResponseModel.isValidResponse(record);

        }catch(err){

            return ResponseModel.isInValidResponse(err);

        }

    }

    public static async getCI(req:express.Request){

        try{

            let record = await CIModl.find({});
            return ResponseModel.isValidResponse(record);

        }catch(err){

            return ResponseModel.isInValidResponse(err);

        }

    }

   ///////////////////DASHBOARD\\\\\\\\\\\\\\\\\\

   public static async pieData(req:express.Request){

    try{

        let newState = await incidentModel.count({State:"New"});
        let inProgress = await incidentModel.count({State:"In Progress"});
        let OnHold = await incidentModel.count({State:"On Hold"});
        let Resolved = await incidentModel.count({State:"Resolved"});
        let Cancelled = await incidentModel.count({State:"Cancelled"});
        let obj = {

            "New":newState, 
            "inProgress":inProgress, 
            "OnHold":OnHold, 
            "Resolved":Resolved, 
            "Cancelled":Cancelled

        }
        return ResponseModel.isValidResponse(obj);

    }catch(err){

        return ResponseModel.isInValidResponse(err);

    }

   }

   public static async barData(req:express.Request){

    try{

        let grpData:any = await groupModel.find({},{Name:1}); 
        let GroupName:Array<string> = [];
        let IncCount:Array<number> = [];
        let data;
        
        for(let i = 0; i<grpData.length ; i++){

            GroupName.push(grpData[i].Name);
            IncCount.push(await incidentModel.count({AssignmentGroup:grpData[i]._id}));

        }
        
        data = {
            grp:GroupName,
            inc:IncCount
        }

        return ResponseModel.isValidResponse(data);

    }catch(err){

        return ResponseModel.isInValidResponse(err);

    }

   }

   public static async incCard(req:express.Request){

    try{

        let ciData:any = await CIModl.find({},{Name:1}); 
        let ciName:Array<string> = [];
        let IncCount:Array<number> = [];
        let data;
        
        for(let i = 0; i<ciData.length ; i++){

            ciName.push(ciData[i].Name);
            IncCount.push(await incidentModel.count({ConfigurationItem:ciData[i]._id}));

        }
        
        data = {
            ci:ciName,
            inc:IncCount
        }

        return ResponseModel.isValidResponse(data);

    }catch(err){

        return ResponseModel.isInValidResponse(err);

    }

   }

   public static async userCard(req:express.Request){

    try{
        
        let grData:any = await groupModel.find({},{Name:1,GroupMembers:1});
        let userNum:any = await userModel.countDocuments({Active:true});
        let grName:Array<string> = [];
        let userCount:Array<number> = [];
        for( let i = 0; i<grData.length;i++){

            grName.push(grData[i].Name)
            userCount.push(grData[i].GroupMembers.length);

        }
        let data = {
            gr:grName,
            user:userCount,
            totalUsers:userNum
        }
        
        return ResponseModel.isValidResponse(data);

    }catch(err){
        
        return ResponseModel.isInValidResponse(err);

    }

   }

}