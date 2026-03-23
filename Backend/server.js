//Start the server

//load environment variables
//start server

const app=require("./app");
const connectDatabase=require('./db')
//import dotenv
const dotenv=require("dotenv");
dotenv.config({path: "./config/config.env"});

connectDatabase();
//start the server


const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})
