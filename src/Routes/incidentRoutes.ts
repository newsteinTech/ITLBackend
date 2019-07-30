import { Router, Request, Response } from "express";
import { incidentController } from "../Controller/incidentController";

export let incidentRoutes:Router = Router();
let incConObj = new incidentController();
incidentRoutes.get("/",(req:Request,res:Response)=>{

    res.send("From incident routes");

})