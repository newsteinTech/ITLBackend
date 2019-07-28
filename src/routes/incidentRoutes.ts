import { Router } from "express";
import { IncidentController } from "../controller/incidentController";

export const incidentRoutes: Router = Router();

export let incidentControllerObj= new IncidentController();

incidentRoutes.post('/create', incidentControllerObj.createIncident)
incidentRoutes.put('/update/:Id', incidentControllerObj.updateIncident)
incidentRoutes.get('/getIncidentByGroup', incidentControllerObj.getIncidentByGroup)
incidentRoutes.get('/getAllIncidents', incidentControllerObj.getAllIncidents)