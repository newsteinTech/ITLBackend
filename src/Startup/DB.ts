import mongoose from "mongoose";

export class DB{

    public static connectDB(){

        let cs = "mongodb://localhost:27017/ITIL";
        mongoose.connect(cs,{useNewUrlParser:true})
        .then(()=>{
            console.log("DB Connected.");
        })
        .catch((err)=>{
            console.log(err);
        })
    }

}