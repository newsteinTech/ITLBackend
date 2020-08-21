import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment"
export class DB{

    public static connectMongoDB(){
        let connectionString: string= "mongodb://localhost:27017/ITILDB";
       // let connectionString: string = "mongodb+srv://Admin:admin@cluster0-glszr.mongodb.net/test?retryWrites=true&w=majority"
        mongoose.connect(connectionString, {useNewUrlParser:true})
        .then(()=>{console.log("DB connected")}) 
        .catch((err)=>{console.log("DB connection failure")});

       // autoIncrement.initialize(mongoose.createConnection(connectionString));
    }

}

