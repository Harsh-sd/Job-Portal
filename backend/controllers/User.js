const bcrypt=require("bcryptjs");
const User=require("../models/User");
const jwt=require("jsonwebtoken")
//to signup the user

exports.signup=async (req,res)=> {
    try {
       const {fullName , email , password , phoneNumber , role} =req.body;
       if(!fullName|| !email || !password || !phoneNumber || !role){
        return res.status(401).json({
            message:"!! User details are missing , please check once !!",
            success :false
        })
       };
       const existingUser=await User.findOne({email:email});
       if(existingUser){
        return res.status(409).json({
            message:"!! User is already logged In , please try with another email !!",
            success :false
        })
       };
       const hashedPassword=await bcrypt.hash(password , 12);
       const user =new User ({
        fullName,
        email,
        password:hashedPassword,
        phoneNumber,
         role 
        })
        const savedUser=await user.save();
        res.status(201).json({
            message:"User signup successfully" , User :savedUser,
            success:true
        })

    } catch (error) {
        res.status(500).json({
            message:"Internal Server error",
            success :false
        })
    }
};
//To login the user
exports.login=async(req,res)=> {
    try {
        const { email , password} =req.body;
        if(!email || !password){
            return res.status(401).json({
                message:"!! User details are missing , please check once !!",
                success :false
            });
        }
        const saveduser =await User.findOne({email:email});
        if(!saveduser){
            return res.status(401).json({
                message:"User is not found in the database",
                success:false
            }) 
        }
            const comparePassword=await bcrypt.compare(password , saveduser.password);
            if(!comparePassword){
                return res.status(401).json({
                    message:"!! Password is not matching !!",
                    success :false
                })
            }
            const token=jwt.sign({userId :saveduser._id} , process.env.SECRET_KEY ,{ expiresIn: '1h' });
           const user={
                _id:saveduser._id,
                fullName:saveduser.fullName,
                email:saveduser.email,
                password :saveduser.password,
                role:saveduser.role,
                profile:saveduser.profile
            }
            return res.status(201).json({
                message:`welcome back ${user.fullName}`,
                user,
                token,
                success:true
            })
            
        
    } catch (error) {
        res.status(500).json({
            message:"Internal Server error",
            success :false
        });
        }
    }
    //get current user
    exports.getCurrentUser=async(req,res)=> {
        try {
            const email=req.query.email;
            const getUser=await User.findOne({email:email});
            if(!getUser){
                return res.status(400).json({
                    message:"user not found",
                    success :false
                });
            }
            
            res.status(201).json({
                message:"user found",
                getUser,
                success:true
            })

        } catch (error) {
            res.status(500).json({
                message:"Internal Server error",
                success :false
            });
        }
    }
        //To logout the user
        exports.logout = async (req, res) => {
            try {
                
                
                // Clear the authentication token by setting it to an empty value with a maxAge of 0
                return res.status(200).cookie("token", "", {
                    maxAge: 0,          // This ensures the cookie expires immediately
                    httpOnly: true,      // Makes sure the cookie is only accessible by the server
                    sameSite: "strict"   // Prevents CSRF attacks
                }).json({
                    message: 'User  logged out successfully',
                    success: true
                });
            } catch (error) {
                return res.status(500).json({
                    message: "Internal Server Error",
                    success: false,
                    error: error.message
                });
            }
        };
// To update the profile
exports.updateProfile=async(req,res)=> {
    try {
        const {fullName , email ,  phoneNumber , role ,skills , bio} =req.body;
        const skillsArray=skills.split(",");
       if(!fullName|| !email  || !phoneNumber || !role || !skills || !bio){
        return res.status(401).json({
            message:"!! User details are missing , please check once !!",
            success :false
        })
       };
       const updateprofile=await User.findOne({email});
       if(!updateprofile){
        return res.status(401).json({
            message:"!! User not found in the database !!",
            success :false
        })
       }
       
        
            updateprofile.email=email,
            updateprofile.fullName=fullName,
            updateprofile.phoneNumber= phoneNumber,
            updateprofile.role= role,
            updateprofile.profile.bio=bio,
            updateprofile.profile.skills=skillsArray
            
            await updateprofile.save();
            
            const user={
                _id:updateprofile._id,
                fullName:updateprofile.fullName,
                email:updateprofile.email,
                password :updateprofile.password,
                role:updateprofile.role,
                profile:updateprofile.profile
            }  
        res.status(201).json({
            message:'User profile updated successfully',
            user,
            success:true
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server error",
            success :false
        });
    }
}