const userModel = require("../models/user.model");
const userService = require('../services/user.service');
const BlackListTokenModel = require('../models/blacklistToken.model');
const { validationResult }= require('express-validator');



module.exports.registerUser = async (req,res,next) => {
  const errors = validationResult(req); // agr routes m jo checks kiye {body} m, kuch galat hua to req m miljayega
  if(!errors.isEmpty()){ //if there is error
   return res.status(400).json({errors  : errors.array()}); 
  }

  const {fullname, email, password} = req.body; //we never save pass. to DB directly, we do hashing first
  
  const isUserAlreadyExist = await userModel.findOne({email});
    if(isUserAlreadyExist){
        return res.status(400).json({error : 'User already exist with this email'}); }

  const hashPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname : fullname.firstname,
    lastname : fullname.lastname,
    email,
    password : hashPassword
  });

  const token = user.generateAuthToken();
  res.status(201).json({ token , user });
}

module.exports.loginUser = async (req,res,next) => {
    const errors = validationResult(req); // agr routes m jo checks kiye {body} m, kuch galat hua to req m miljayega
    if(!errors.isEmpty()){ //if there is error
     return res.status(400).json({errors  : errors.array()}); 
    }
    
    const {email, password} = req.body;
    const user = await userModel.findOne({email}).select('+password'); //means while finding user, include password field also bcs we add select false in userSchema
    if(!user){
        return res.status(401).json({error : 'Invalid email or password'});
    }
    
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({error : 'Invalid email or password'});
    }
    
    const token = user.generateAuthToken();

    res.cookie('token', token); //set token in cookie
    res.status(200).json({token, user});
}

module.exports.getUserProfile = async (req,res,next) => {
    res.status(200).json(req.user); //req.user is coming from authMiddleware that we set as "req.user = user"
}

module.exports.logoutUser = async (req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; //agr token cookie m h to use kro wrna header m h
    await BlackListTokenModel.create({token}); //add token to blacklist
    res.clearCookie('token'); //clear cookie


    res.status(200).json({message : 'Logged out successfully'});
}