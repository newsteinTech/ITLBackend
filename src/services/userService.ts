
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

            let newUser: any = new userModel(req.body);
            await newUser.save();

            //add objectid of the new user to GroupMembers field of groupdetail table
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

    public static async userLogin(req: Request, res: Response){

        try{
            //check if user exists or not
            console.log(req.body.UserId);
            let user : any= await userModel.findOne({'UserId': req.body.UserId}).exec(); 
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
                    let payload= {'Email':user.Email, 'Name': user.Name, 'Role': user.Role, 'UserId':user.UserId}// user data to be sent in the token
                    let accessToken= await jwt.sign(payload, secret, signingOption);
                    console.log(accessToken);
                    return ResponseModel.getValidResponse({"accessToken": accessToken});
                }
                else{
                    return res.status(401).send("Wrong Password")
                }
            }

            else{
                return res.status(401).send("user does not exist")
            }
        }

        catch(err){
            console.log(err);
        }
    }

    public static async updateUser(req: Request){
        try{

           req.body.UpdateDate = Date.now();
           console.log(req.body);
           let updatedUser: any = await userModel.findOneAndUpdate({'UserId': req.body.UserId}, req.body).exec();
           //await updatedUser.save();

           console.log(updatedUser)// showing previous data of user, not the updated one

           //add user's objectid to groupdetail table in all relevant groups
            for(let i=0; i<req.body.Group.length; i++){
                console.log(req.body.Group[i])
                let group: any = await groupModel.findOne({'_id': req.body.Group[i]}).exec();

                //check if user already exists in group
                for(var j=0;j<group.GroupMembers.length;j++){
                    if(req.body._id==group.GroupMembers[j]){
                    console.log("user already exists in this group"); 
                    break;
                    }
                }

                console.log(j)
                //if user is not already added in that group, it will reach the end of above for loop
                if(j==group.GroupMembers.length){
                console.log("adding to group")
                await group.GroupMembers.push(req.body._id);
                await group.save();
                }
                
            }
            //add code to remove user from old group if it's not in the user's updated group

            return ResponseModel.getValidResponse(updatedUser);
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
           let allusers= await userModel.find({'Active': true}).populate("Group").exec();
           return ResponseModel.getValidResponse(allusers);
        }
        catch(e){
            console.log(e);
            return ResponseModel.getInvalidResponse(e);
        }
    }

    public static async getUserByUserId(req: Request){
        try{
           let user= await userModel.find({'UserId': req.body.UserId}).populate("Group").exec();
           return ResponseModel.getValidResponse(user);
        }
        catch(e){
            console.log(e);
            return ResponseModel.getInvalidResponse(e);
        }
    }

    public static async getLastUser(req: any){
        try{
            //get last incident by sorting according to created date in descending order
            let user: any = await userModel.findOne({}).sort({CreatedDate: -1}).limit(1);
            console.log(user);

            return ResponseModel.getValidResponse(user);
        }
        catch(e){
            console.log(e);
            return ResponseModel.getInvalidResponse(e);
        }
    }


    public static async pagination(req: Request){

        try{

            let pageNumber: number = req.body.Page;
            let pageSize: number= req.body.PageSize;
            let recordsSent = await userModel.find({"Active":true}).skip((pageNumber-1)*pageSize).limit(pageSize);

            return ResponseModel.getValidResponse(recordsSent);

        }
        catch(err){

            return ResponseModel.getInvalidResponse(err);

        }
       


    }
}