const Company=require("../models/Company");

exports.registerCompany=async(req,res)=> {
    try {
        const {name ,description,location,website}=req.body;
        if(!name ||  !description || !location || !website){
           return  res.status(400).json({
                message:"!!! Company details are missing , please check once !!",
                success :false
            });  
        }
            const existingcompany=await Company.findOne({name});
            if(existingcompany){
               return res.status(400).json({
                    message:"!! Company is already registered !!",
                    success :false
                });  
            }
            if (!req.id ) {
                return res.status(401).json({
                    message: "User not authenticated",
                    success: false
                });
            }  
       
            const company= new Company({
              name,
             userId:req.id,
             description,
             location,
             website
            })
            const savecompany=await company.save();
            res.status(201).json({
                message:"company is registered successfully",
                company: {
                    id: savecompany._id, // Add this line
                    ...savecompany.toObject()
                  },
                success:true
            })
        }
    
     catch (error) {
        console.error("Error  in registering company:", error);
        res.status(500).json({
            message:"Internal Server error",
            success :false
        });
     }
    };
    exports.getCompany=async(req,res)=> {
        try {
            const {name }=req.body;
        if(!name ){
           return  res.status(400).json({
                message:"!!! Company details are missing , please check once !!",
                success :false
            });  
        }
        const company=await Company.findOne({name});
        if(!company){
            return res.status(400).json({
                message:"!! Company with specific name does not found!!",
                success :false
            });  
        }
        const companydetails={
            name:company.name,
            description:company.description,
            website:company.website,
            location:company.location,
            _id:company.id
        }
        res.status(201).json({
            message:"company found",
            companydetails,
            success:true
        })
        } catch (error) {
            console.error("Error  in fetching the company:", error);
            res.status(500).json({
                message:"Internal Server error",
                success :false
            });
        }
    };
    exports.getCompanyById=async(req,res)=> {
        try {
            const companyId=req.params.id
            const company=await Company.findById(companyId);
            if(!company){
                return res.status(400).json({
                    message:"company not found by Id",
                    success:true
                })
            };
            res.status(200).json({
              message:"company found by Id",
              company,
              success:true
            })
        } catch (error) {
            console.error("Error  in fetching the company by Id:", error);
            res.status(500).json({
                message:"Internal Server error",
                success :false
            });
        }
    };
    exports.updateCompany=async(req,res)=> {
        try {
            const {name ,description,location,website}=req.body;
        if(!name ||  !description || !location || !website){
           return  res.status(400).json({
                message:"!!! Company details are missing , please check once !!",
                success :false
            });  
        };
        const updatecompany= await Company.findOne({name});
        if(!updatecompany){
            return  res.status(400).json({
                message:"!!! Company does not found !!",
                success :false
            });  
        };
        updatecompany.name=name,
       updatecompany.description= description,
       updatecompany.location= location,
       updatecompany.website= website

        const savecompany= await updatecompany.save();
        res.status(200).json({
            message:"company details have been updated",
            savecompany,
            success:true
        })

        } catch (error) {
            console.error("Error  in updating the details of company:", error);
            res.status(500).json({
                message:"Internal Server error",
                success :false
            });
        }
    };
    exports.getAllCompanies = async (req, res) => {
        try {
          const companies = await Company.find();
      
          if (companies.length === 0) {
            return res.status(404).json({
              message: "No companies found",
              success: false
            });
          }
      
          return res.status(200).json({
            message: "Companies retrieved successfully",
            companies,
            success: true
          });
        } catch (error) {
          console.error("Error fetching companies:", error);
          return res.status(500).json({
            message: "Internal Server Error",
            success: false
          });
        }
      };
      
    