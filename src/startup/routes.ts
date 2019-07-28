import express from "express";
import { userRoutes } from "../routes/userRoutes";
import { incidentRoutes } from "../routes/incidentRoutes";
import { groupRoutes } from "../routes/groupRoutes";


export class Routes{

    constructor(){

    }

    public static configRoutes(app: express.Application){

        app.get('/',(req, res)=>{

            res.send("server running")
        })

       app.use('/api/user', userRoutes)
       app.use('/api/incident', incidentRoutes)
       //app.use('/api/task', taskRoutes)
       app.use('/api/group', groupRoutes)
       //app.use('/api/CI', CIRoutes)
       //app.use('/api/chatPortal', chatPortalRoutes)
       //app.use('/api/querySelector', QSRoutes)

    }
}