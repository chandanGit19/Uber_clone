import mongoose from "mongoose";

const dbconnection =()=>{
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("DBisConnected")
    }).catch((e)=>{
        console.log(`error in connection ${e}`);
        process.exit(1);
    })
}

export default dbconnection