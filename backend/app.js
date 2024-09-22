const express=require("express")
const cors=require("cors")
const cookieparser=require("cookie-parser")
const dotenv=require("dotenv");
const bodyparser=require("body-parser")
const connectToMongoose=require("./db");
const userRoutes=require("./routes/User");
const companyRoutes=require("./routes/Company");
const jobRoutes=require("./routes/Job");
const applicationRoutes=require("./routes/Application");

const app=express()
app.use(bodyparser.json());
connectToMongoose();
dotenv.config({})
app.use(bodyparser.urlencoded({extended:true}))
app.use(cookieparser());
const corsOptions = {
  origin: "http://localhost:5173", // Adjust if your frontend is on a different port
  credentials: true
};
app.use(cors(corsOptions));
app.use(userRoutes);
app.use(companyRoutes);
app.use(jobRoutes);
app.use(applicationRoutes);
PORT=process.env.PORT || 3000
app.listen(PORT , ()=> {
    console.log(`App is running on port ${PORT}`);
})