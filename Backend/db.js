const mongoose=require('mongoose');

const connectDatabase=()=>{
    mongoose.connect(process.env.Mongo_URI).then((con)=>{
        console.log(`MongoDb database connected with Host:${con.connection.host}`);
    }).catch((err)=>{
        console.log(`Error connecting to MongoDB: ${err.message}`);
    })
}

module.exports=connectDatabase;