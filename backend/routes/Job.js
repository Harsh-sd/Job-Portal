const express=require("express")
const router=express.Router()
const isAuth=require("../middleware/Auth");
const jobControllers=require("../controllers/Job");
router.post("/createjob",isAuth ,jobControllers.createJob );
router.put("/editjob/:id",isAuth ,jobControllers.editJob );
router.get("/getjob",isAuth ,jobControllers.getAllJob );
router.get("/getjobbyquery",isAuth ,jobControllers.getJobsByQuery );
router.get("/getjobbyid/:id" , isAuth ,jobControllers.getJobById )
module.exports =router
