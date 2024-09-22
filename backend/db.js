const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config({})

async function   connectToMongoose(){
try {
    const coonnectdb=await mongoose.connect(process.env.MONGO_URI);
    if(coonnectdb){
      console.log("Database connected successfully");
    }
      else {
          console.log("Error in connecting the database")
      
    }
  } catch (error) {
      console.log(error)
  }
  }
module.exports=connectToMongoose;