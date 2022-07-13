const express=require('express');
const AuthController=require('../controllers/auth')
const router=express.Router();

 router.post("/signup",AuthController.createAuth)
 router.post('/login',AuthController.authLogin)

module.exports=router;
