const express=require("express");
const applicationContollers=require("../controllers/Application");
const isAuth=require("../middleware/Auth");
const router=express.Router();
router.post("/applyjob/:id" ,isAuth, applicationContollers.applyJob);
router.post("/getallappliedjobs" ,isAuth, applicationContollers.getAppliedJobs);
router.get('/job/:id/applicants', isAuth, applicationContollers.getAllApplicants);
router.post("/updatestatus/:id" , isAuth,applicationContollers.updateStatus);
module.exports =router