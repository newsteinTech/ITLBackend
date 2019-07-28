import express from 'express';
import bodyParser = require('body-parser');
import { Routes } from './Startup/routes';
import { DB } from './Startup/DB';

class ITIL{

    public app:express.Application = express();
    public constructor(){

        this.app.listen(3000,"localhost",()=>{

            console.log("Server Started.")

        });
        this.configBodyParser();
        DB.connectDB();
        Routes.configRoutes(this.app);

    }

    private configBodyParser(){

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:true}));

    }

}

let o1 = new ITIL();