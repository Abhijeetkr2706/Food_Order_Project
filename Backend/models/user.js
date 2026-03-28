const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema(
    {
       name:{
        type:String,
        required:[true,"Please enter your name"],
        maxlength:[30,"Name cannot exceed 30 characters"]
       } ,

       email:{
        type:String,
        required:[true,"Please enter email"],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,"Enter valid email"]
       },
       password:{
        type:String,
        required:[true,"Enter the password"],
        minlength:6,
        select:false
       },
       passwordConfirm:{
        type:String,
        required:[true,"Confirm password is required"],
        validate:{
            validator: function(el){
                return el== this.password
            },
            message:"Passwords are not same",
        },
       },

       phoneNumber:{
        type:String,
        required:true,
        match: [/^[0-9]{10}$/, "Enter valid phone number"],
       },

       role:{
        type:String,
        enum:["user","restaurant-owner","owner"],
        default:"user",
       },

       avatar:{
        public_id: String,
        url:String,
       },

       passwordChangedAt: Date,
       passwordResetToken:String,
       passwordResetExpires:Date,
    },{timestamps:true},
);
