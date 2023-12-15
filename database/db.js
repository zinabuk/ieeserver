import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
const db = process.env.DATABASE_LOCAL;
function conn(){
    
mongoose.connect(db).then(()=>{
    console.log("DB connected successfully");
}).catch(err=>{
    console.log("Error " + err.name)
})
 
}

export default conn;