const mongoose=require("mongoose")
const Schema=mongoose.Schema;
const applicationSchema=new Schema ({
job:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Job",
    required:true
},
user :{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
status:{
    type:String,
    enum:["pending" , "accepted" ,"rejected"],
    default:"pending"
}
} , {timeStamps :true});
module.exports=mongoose.model("Application" , applicationSchema)