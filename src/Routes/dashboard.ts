import { Router, Request, Response } from "express";
import { Dashboard } from "../Controller/dashboard";

export let dashRoutes = Router();
let dashConObj = new Dashboard();
dashRoutes.get('/',(req:Request,res:Response)=>{

    res.send("hello from dash.")

})
dashRoutes.get("/pie",dashConObj.pieData);
dashRoutes.get("/bar",dashConObj.barData);
dashRoutes.get("/incCard",dashConObj.incCard);
dashRoutes.get("/userCard",dashConObj.userCard);