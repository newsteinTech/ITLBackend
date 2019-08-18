import { Router, Request, Response } from "express";
import { incidentController } from "../Controller/incidentController";

export let incidentRoutes:Router = Router();
let incConObj = new incidentController();
incidentRoutes.get("/",(req:Request,res:Response)=>{

    res.send("From incident routes");

})
incidentRoutes.post("/createIncident",incConObj.createIncident);
incidentRoutes.post("/updateIncident",incConObj.updateIncident);
incidentRoutes.get("/getAllIncident",incConObj.getAllIncident);
incidentRoutes.get("/incNum",incConObj.getIncNumber);
incidentRoutes.post("/pagiInc",incConObj.pagiInc);
incidentRoutes.post("/incByNum",incConObj.getIncByNum);