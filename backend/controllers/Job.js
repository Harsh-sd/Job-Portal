const Job=require("../models/Job ");
const Company=require("../models/Company");
exports.createJob=async(req,res)=> {
try {
    const {title , description ,requirements , salary ,jobType , positions , experience , compId }=req.body;
    if(!title|| !description || !requirements || !salary  || !jobType ||  !positions || !experience || !compId ){
        return  res.status(400).json({
            message:"!!! Job details are missing , please check once !!",
            success :false
        });
    }
    const userId=req.id;
    console.log("userId:" ,userId);
    console.log("companyId:",compId);
    
    
    const newJob = new Job({
        title,
        description,
        jobType,
        positions: Number(positions),
        requirements,
        salary: Number(salary),
        company: compId,
        created_by: userId,
        experienceLevel: experience
    });
    const savedjob=await newJob.save();
    const jobData={
        title:savedjob.title,
        description:savedjob.description,
        jobType:savedjob.jobType,
        positions:savedjob.positions,
        requirements:savedjob.requirements,
        experienceLevel:savedjob.experienceLevel,
        company:savedjob.company,
        salary:savedjob.salary,
        created_by:savedjob.created_by
    }
    res.status(200).json({
        message:`New job of ${jobData.title} created`,
        success:true,
        jobData


    })

} catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({
        message:"Internal Server error",
        success :false
    });
}
};
exports.getAllJob=async(req,res)=> {
    try {
        const userId=req.id;
        const findJobs=await Job.find({created_by:userId})
        .populate("company" , "name")
        .populate("created_by", "fullName"); 

        if (!findJobs || findJobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found for this user.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Jobs retrieved successfully",
            success: true,
            jobs: findJobs
        });
        
    } catch (error) {
        console.error("Error in getting all the job:", error);
    res.status(500).json({
        message:"Internal Server error",
        success :false
    });
        
    }
}
exports.getJobsByQuery = async (req, res) => {
    try {
        // Extract the query parameters from the request
        const { title, jobType, salary, company } = req.query;
        
        // Create a query object
        let query = {};
        
        if (title) {
            query.title = new RegExp(title, "i"); // Case-insensitive search for title
        }
        
        if (jobType) {
            query.jobType = jobType; // Exact match for job type
        }
        
        if (salary) {
            query.salary = { $gte: Number(salary) }; // Find jobs with salary greater than or equal to the provided value
        }
        
        if (company) {
            query.company = company; // Exact match for company ID
        }

        // Find jobs based on the query
        const jobs = await Job.find(query)
            .populate("company", "name") 
            .populate("created_by", "fullName"); 
        
        res.status(200).json({
            message: "Jobs retrieved successfully by query",
            success: true,
            jobs
        });

    } catch (error) {
        console.error("Error  in finding jobs:", error);
        res.status(500).json({
            message: "Internal Server error",
            success: false
        });
    }
};
exports.getJobById=async(req,res)=> {
    try {
        const jobId=req.params.id;
        console.log(jobId);
         const findjob=await Job.findById(jobId);
         if(!findjob){
            return res.status(400).json({
             message:"job of this Id not found",
             success:false
            })
        }
            res.status(201).json({
                message:"job of this Id found successfully",
                findjob,
                success:true
            })
         

    } catch (error) {
        console.error("Error  in finding jobs:", error);
        res.status(500).json({
            message: "Internal Server error",
            success: false
        });
    }
}