import { Router } from "express";
import { CIController } from "../Controller/CIController";

export let CIRoutes = Router();
let CIConObj = new CIController();
CIRoutes.get("/",(req:any,res)=>{
    res.send("From ci");
})
CIRoutes.post("/createCi",CIConObj.createCI);
CIRoutes.get("/getCi",CIConObj.getCi);
