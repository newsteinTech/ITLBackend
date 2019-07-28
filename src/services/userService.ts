
import {Request, Response} from "express";
import { ResponseModel } from "../helper/responseModel";
import { userModel, groupModel } from "../models/Model";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class UserService{

    public static async createUser(req: Request){

        try{

            let hashPassword= await bcrypt.hash(req.body.Password,12)
            req.body.Password= hashPassword;
            
            //to map the groupId from front end to the objectId of the group before creating the user in the db
            //so that the objectId of groups get added into the User's Group field instead of GroupId
            if(req.body.Group){
               for(let i=0; i<req.body.Group.length; i++){
              let group: any = await groupModel.findOne({'GroupId': req.body.Group[i]}).exec();
              req.body.Group[i]= group._id;
              console.log(req.body.Group[i]);
              }
            }

            let newUser: any = new userModel(req.body);
            await newUser.save();

            if(newUser.Group){
                for(let i=0; i<newUser.Group.length; i++){
                let group: any = await groupModel.findOne({'_id': newUser.Group[i]}).exec();
                await group.GroupMembers.push(newUser._id);
                await group.save();
              }
            }

            return ResponseModel.getValidResponse(newUser);
        }
        catch(e){
            console.log(e);
        }
    } 

    public static async userLogin(req: Request){

        try{
            //check if user exists or not

            let user : any= await userModel.findOne({'Email': req.body.Email}).exec(); 
            if(user)
            {
                //check for pwd match
                let IspasswordMatch= await bcrypt.compare(req.body.Password, user.Password)
                // user.password is the encrypted pwd stored in db, req.body.password is the text password in post call
                if(IspasswordMatch)
                {
                    //login success, then generate access token
                    let signingOption: jwt.SignOptions= {expiresIn: "12h"}; //12 hours
                    let secret ="secret";// secret is the key used for encrypting the payload
                    let payload= {'Email':user.email, 'Name': user.Name, 'Role': user.Role, 'UserId':user.UserId}// user data to be sent in the token
                    let accessToken= await jwt.sign(payload, secret, signingOption);
                    return ({'accessToken': accessToken});
                }
                else{
                    return ("Wrong Password")
                }
            }

            else{
                return ("user does not exist")
            }
        }

        catch(err){
            console.log(err);
        }
    }

    public static async updateUser(req: Request){
        try{

            //to map the groupId from front end to the objectId of the group before updating the user in the db
            //so that the objectId of groups get added into the User's Group field instead of GroupId
            for(let i=0; i<req.body.Group.length; i++){
                let group: any = await groupModel.findOne({'GroupId': req.body.Group[i]}).exec();
                req.body.Group[i]= group._id;
                console.log(req.body.Group[i]);
              }

           let a = await userModel.findOneAndUpdate({'UserId': req.body.UserId}, req.body).exec();
           return ResponseModel.getValidResponse(a);
        }
        catch(e){
            console.log(e);
            return ResponseModel.getInvalidResponse(e);
        }
    }

    public static async deleteUser(req: Request){
        try{
           let a = await userModel.findOneAndUpdate({'UserId': req.body.UserId}, {'Active': false}).exec();
           return ResponseModel.getValidResponse(a);
        }
        catch(e){
            console.log(e);
            return ResponseModel.getInvalidResponse(e);
        }
    }

    public static async getAllUsers(req: Request){
        try{
           let allusers= await userModel.find({'Active': true}).exec();
           return ResponseModel.getValidResponse(allusers);
        }
        catch(e){
            console.log(e);
            return ResponseModel.getInvalidResponse(e);
        }
    }
}