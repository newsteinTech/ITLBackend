import { Router, Request, Response } from "express";
import { groupController } from "../Controller/groupController";

export let groupRoutes:Router = Router();
let grpConObj = new groupController();
groupRoutes.get("/",(req:Request,res:Response)=>{
    res.send("Group Routes.");
})
groupRoutes.post("/createGroup",grpConObj.createGroup);
groupRoutes.post("/updateGroup",grpConObj.updateGroup);
groupRoutes.get("/getGroups",grpConObj.getGroups);