import express from "express"
import { userRoutes } from "../Routes/userRoutes";
import { groupRoutes } from "../Routes/groupRoutes";
import { incidentRoutes } from "../Routes/incidentRoutes";
export class Routes{

    public static configRoutes(app:express.Application){

        app.get('/',(req:express.Request,res:express.Response)=>{

            res.send("Server Running.");

        });

        app.use("/api/user",userRoutes);
        app.use("/api/group",groupRoutes);
        app.use("/api/incident",incidentRoutes);
    }

}