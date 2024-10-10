const express=require("express");
const userContollers=require("../controllers/User");
const isAuth=require("../middleware/Auth");
const { body  , query} = require('express-validator');
const router=express.Router();
//Route for signing up the user
router.post("/signup",[
    body("fullName")
    .notEmpty()
    .withMessage("FullName is required."),
    body("email")
    .isEmail()
    .withMessage("Email is Required."),
    body("password").isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long'),
  body("phoneNumber")
  .notEmpty()
  .withMessage('Phone number is required'),
body("role")
.notEmpty()
.withMessage('Role is required')

] ,userContollers.signup );
router.post("/login" ,[
    body('email')
    .isEmail().withMessage('Please provide a valid email address')
    .notEmpty().withMessage('Email is required'),
  body('password')
    .notEmpty().withMessage('Password is required')
],userContollers.login);
router.get("/current-user",[
    query('email')
    .isEmail().withMessage('Please provide a valid email address')
    .notEmpty().withMessage('Email is required')
] ,userContollers.getCurrentUser);
router.put("/profile/update",[
    body('fullName')
    .notEmpty().withMessage('Full name is required'),
  body('email')
    .isEmail().withMessage('Please provide a valid email address')
    .notEmpty().withMessage('Email is required'),
  body('phoneNumber')
    .notEmpty().withMessage('Phone number is required'),
  body('role')
    .notEmpty().withMessage('Role is required'),
  body('skills')
    .notEmpty().withMessage('Skills are required'),
  body('bio')
    .notEmpty().withMessage('Bio is required')
] ,isAuth,userContollers.updateProfile );
router.post("/logout" ,isAuth,userContollers.logout );

module.exports =router;