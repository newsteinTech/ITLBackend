import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment"
export class DB{

    public static connectMongoDB(){
        let connectionString: string= "mongodb://localhost:27017/ITILDB";

        mongoose.connect(connectionString, {useNewUrlParser:true})
        .then(()=>{console.log("DB connected")}) 
        .catch((err)=>{console.log("DB connection failure")});

       // autoIncrement.initialize(mongoose.createConnection(connectionString));
    }

}

