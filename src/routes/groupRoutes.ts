import { Router } from "express";
import { GroupController } from "../controller/groupController";

export const groupRoutes: Router = Router();

export let groupControllerObj= new GroupController();

groupRoutes.post('/create', groupControllerObj.createGroup)
groupRoutes.put('/update/:Id', groupControllerObj.updateGroup)
groupRoutes.get('/getAllGroups', groupControllerObj.getAllGroups)