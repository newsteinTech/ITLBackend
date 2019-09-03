import { Router } from "express";
import { IncidentController } from "../controller/incidentController";
import { Authenticate } from "../middleware/authentication";

export const incidentRoutes: Router = Router();

export let incidentControllerObj= new IncidentController();

incidentRoutes.post('/createIncident', incidentControllerObj.createIncident)
incidentRoutes.put('/updateIncident', incidentControllerObj.updateIncident)
incidentRoutes.get('/getIncidentCountByGroup', incidentControllerObj.getIncidentCountByGroup)
incidentRoutes.get('/getIncidentByAssignedTo', incidentControllerObj.getIncidentByAssignedTo)
incidentRoutes.get('/getAllIncidents', incidentControllerObj.getAllIncidents)
incidentRoutes.get('/getLastIncident', incidentControllerObj.getLastIncident)
incidentRoutes.post('/paginate', incidentControllerObj.pagination)