

const express=require('express');
//create express application
const app=express();

//Import middleware packages
const cors=require("cors");
const bodyParser=require("body-parser")

//user middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.send("Server is running");
})

module.exports=app;
