import dotenv from "dotenv";
dotenv.config();
import http from "http"
import app from "./app.js";
import  dbConnect from "./databaseConnect/dbConnect.js"

const server = http.createServer(app);

const PORT = process.env.PORT || 4000

server.listen(PORT,()=>{
    dbConnect()
    console.log(`app is listing on the port ${PORT}`);
})
