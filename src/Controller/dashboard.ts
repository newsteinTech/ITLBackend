import express from "express";
import { Services } from "../Services/services";

export class Dashboard{

    public async pieData(req:express.Request,res:express.Response){

        let result = await Services.pieData(req);
        res.send(result);

    }

    public async barData(req:express.Request,res:express.Response){

        let result = await Services.barData(req);
        res.send(result);

    }

    public async incCard(req:express.Request,res:express.Response){

        let result = await Services.incCard(req);
        res.send(result);

    }

    public async userCard(req:express.Request,res:express.Response){

        let result = await Services.userCard(req);
        // console.log(result);
        res.send(result);

    }

}