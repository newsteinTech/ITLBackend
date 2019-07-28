import express from "express";
import { userModel } from "../Model/Model";
import { ResponseModel } from "../Helper/Helper";

export class Services{

    public static async CreateUser(req:express.Request){

        try{

            let newUser = new userModel(req.body);
            await newUser.save();
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
                "UpdateDate":Date.now()
            });

            return ResponseModel.isValidResponse(updateUser);

        }catch(err){

            return ResponseModel.isInValidResponse(err);

        }

    }

    public static async updategroup(req:express.Request){

        try{

            // First we need to find group.
            let updateUser = await userModel.updateOne(
            {
                'UserId':req.body.UserId
            },
            {
                $push:{"Group":req.body.Group},
                "UpdateDate":Date.now()
            });

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

}