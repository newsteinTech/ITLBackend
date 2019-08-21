import { Request, Response } from "express";
import *as jwt from 'jsonwebtoken';
import { ActionType } from "../Data Model/Action";
import { RolePermission } from "../Data Model/Permission";

export class Authanticate{

   public static async Authanticate(req:any,res:Response,next:any){

    let token:any = req.header("Authorization");
    if(token == null){

        return res.status(401).send("Access Denied.");

    }

    try{

        let decodeToken:any = await jwt.verify(token,"secret");
        req.user = decodeToken;
        console.log(decodeToken);
        next();

    }catch(err){

        return res.status(401).send("Bad Request, Access Denied");

    }   

   }

   public static async AutharizeInc(req:any,res:Response,action:ActionType){

    switch(req.user.Role){

        case "Admin":{

            let result = RolePermission.Incident.Admin.Permission.indexOf(action);
            if(result>0){

                return true;

            }else{

                return false;

            }

        }

    }

   }

}