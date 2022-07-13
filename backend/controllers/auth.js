const Auth=require('../models/auth');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


exports.createAuth=(req,res,next)=>{
  bcrypt.hash(req.body.password,10)
  .then(hash=>{
    const auth=new Auth({
      Email:req.body.email,
      password:hash
    });
    auth.save()
    .then(result=>{
      res.status(201).json({
        message:'auth created',
        result:result
      });
    })
    .catch(err=>{
      res.status(500).json({
          message:"Email Already exists"
      });
    });
  })
}

exports.authLogin=(req,res,next)=>{
  let fetchedAuth;
  Auth.findOne({Email:req.body.email})
    .then(auth=>{
      if(!auth){
        return res.status(404).json({
          message:'user not found'
        });
      }
      fetchedAuth=auth
     return bcrypt.compare(req.body.password,auth.password);
    })
    .then(result=>{
      if(!result){
        return res.status(404).json({
          message:'auth failed in result'
        });
      }
      const token=jwt.sign(
        {email:fetchedAuth.Email,authId:fetchedAuth._id},
        process.env.JWT_KEY,
        {expiresIn:"1h",}
        )
        res.status(200).json({
          token:token,
          expiresIn:3600,
          authId:fetchedAuth._id
        })
    })
    .catch(err=>{
      return res.status(404).json({
        message:'Invlaid authentication credentials'
      });
    })
}
