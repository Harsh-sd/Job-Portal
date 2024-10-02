const Application=require("../models/Application");
const Job=require("../models/Job ");
const nodemailer = require('nodemailer');
require('dotenv').config(); 
exports.applyJob=async(req,res)=> {
try {
    const userId=req.id;
    const jobId =req.params.id;
    const existingApplied=await Application.findOne({user:userId ,job:jobId});
    if(existingApplied){
        return res.status(400).json({
            message:"!! Application is already registered !!",
            success :false
        }); 
    }
    const job=await Job.findById(jobId);
    if(!job){
        return res.status(404).json({
            message:"!! Job not found!!",
            success :false
        });
    }
    const application=new Application({
        user:userId,
        job:jobId,
        
    });
    job.applications.push(application._id)
    await job.save();
      // Save the application document
      await application.save();
    res.status(201).json({
        message:"job applied successfully , Application saved",
        job,
        success:true
    })

} catch (error) {
    console.error("Error in applying to the job:", error);
    res.status(500).json({
        message:"Internal Server error",
        success :false
    });
}
};
exports.getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;

        // Ensure userId is defined
        if (!userId) {
            return res.status(400).json({
                message: "User ID is not provided",
                success: false
            });
        }

        // Find applications for the user and populate job details
        const findApplications = await Application.find({ user: userId })
            .populate('job', 'title'); // Optionally populate job details

            console.log(findApplications)
        // Check if any applications are found
        if (findApplications.length === 0) {
            return res.status(404).json({
                message: "No applications found for this user",
                success: false
            });
        }

        // Send response with applications
        res.status(200).json({
            message: "Applications are found and displayed",
            success: true,
            applications: findApplications
        });
    } catch (error) {
        console.error("Error in fetching the applied jobs:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};
exports.getAllApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Find the job by its ID
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            populate: {
                path: 'user',
                select: 'fullName  , email , phoneNumber' // Adjust fields as necessary
            }
        });

        // Check if the job exists
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Get all applications for the job
        const applicants = job.applications;

        // Check if there are any applicants
        if (applicants.length === 0) {
            return res.status(404).json({
                message: "No applicants found for this job",
                success: false
            });
        }

        // Respond with the list of applicants
        res.status(200).json({
            message: "Applicants retrieved successfully",
            success: true,
            applicants
        });
    } catch (error) {
        console.error("Error fetching applicants:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};



exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    console.log(applicationId);

    const application = await Application.findById({ _id: applicationId }).populate('user', 'email fullName');
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    // Send notification email to the user
    sendStatusUpdateEmail(application.user.email, application.user.fullName, status);

    res.status(201).json({
      message: "Status is updated successfully",
      application,
      success: true,
    });

  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Function to send email



const sendStatusUpdateEmail = (email, fullName, status) => {
  // Create a transporter using your email service credentials from environment variables
  const transporter = nodemailer.createTransport({
    service: 'gmail', // For example, using Gmail
    auth: {
      user: process.env.EMAIL_USER, // Fetch email from environment variable
      pass: process.env.EMAIL_PASSWORD, // Fetch email password from environment variable
    },
  });

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address from environment variable
    to: email, // Receiver's email
    subject: 'Application Status Update',
    text: `Dear ${fullName},\n\nYour application status has been updated to: ${status}.\n\nThank you for applying.\n\nBest Regards,\n${process.env.COMPANY_NAME}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

