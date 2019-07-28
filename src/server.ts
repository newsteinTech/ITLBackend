import express from "express";
import { Routes } from "./startup/routes";
import { DB } from "./startup/db";
import bodyParser from "body-parser";

class Incident{

    app: express.Application;
   
   constructor(){
       this.app= express();
       this.app.listen(3000, 'localhost', function(){
       console.log("server is running");
      })
   
      this.configBodyParser();
      Routes.configRoutes(this.app); 
      DB.connectMongoDB();
   }
   
     private configBodyParser(){
       this.app.use(bodyParser.json()); 
       this.app.use(bodyParser.urlencoded({extended: true}));
     }
   
   }
   
   const incident= new Incident();