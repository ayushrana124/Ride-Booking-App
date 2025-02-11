const userModel = require("../models/user.model");
const userService = require('../services/user.service');
const { validationResult }= require('express-validator')



module.exports.registerUser = async (req,res,next) => {
  const errors = validationResult(req); // agr routes m jo checks kiye {body} m, kuch galat hua to req m miljayega
  if(!errors.isEmpty()){ //if there is error
   return res.status(400).json({errors  : errors.array()}); 
  }

  const {fullname, lastname, email, password} = req.body; //we never save pass. to DB directly, we do hashing first
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