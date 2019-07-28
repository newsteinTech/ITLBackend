import express from "express"
import { userRoutes } from "../Routes/userRoutes";
export class Routes{

    public static configRoutes(app:express.Application){

        app.get('/',(req:express.Request,res:express.Response)=>{

            res.send("Server Running.");

        });

        app.use("/api/user",userRoutes);
    }

}