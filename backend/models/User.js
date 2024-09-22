const mongoose=require("mongoose")
const Schema=mongoose.Schema
const userSchema=new Schema({
fullName:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
phoneNumber:{
    type:Number,
    required:true
},
role:{
    type:String,
    enum:['student' , 'recruiter'],
    required:true
},
profile:{
    bio:{type:String},
    skills:[{type:String}],
    resume:{type:String},
    resumeOriginalName:{type:String},
    company:{type:mongoose.Schema.Types.ObjectId , ref:"company"},
    profilePhoto:{
        type:String,
        default:""
    }
}
} , {timeStamps:true});
module.exports=mongoose.model("User" , userSchema)