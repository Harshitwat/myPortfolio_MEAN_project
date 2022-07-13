
const User=require('../models/user');

exports.createUser=(req,res,next)=>{
   const url=req.protocol+'://'+req.get("host");
   const user=new User({
     firstName:req.body.firstName,
     lastName:req.body.lastName,
     designation:req.body.designation,
     location:req.body.location,
     about:req.body.about,
     pImage:url+"/images/"+req.files[0].filename,
     cImage:url+"/images/"+req.files[1].filename,
     creator:req.authData.authId,
     cvLink:req.body.cvLink
   });
   user.save().then(createdUser=>{
     res.status(201).json({
       message:'user added successfully',
       user:{
         ...createdUser,
         userID:createdUser._id

       }
     })
   })
 }

exports.getUsers=(req,res,next)=>{
  User.find().then((documents)=>{
    res.status(200).json({
      message:'Users fetched successfulyy',
      users:documents
    });
  });
  }

  exports.getUser=(req,res,next)=>{
    User.findById(req.params.id).then(user=>{
      if(user){
        res.status(200).json(user)
      }else{
        res.status(404).json({message:'User does not exist'})
      }
    })
    }

  exports.editUser=(req,res,next)=>{
    let pImage=req.body.pImage
    let cImage=req.body.cImage
    if(req.files[0] || req.files[1]){
      const url=req.protocol+'://'+req.get("host");
      if((req.files[0]  && req.files[1]) || (req.files[0] && !req.body.pImage))
      pImage=url+"/images/"+req.files[0].filename
      if(req.files[1] || req.files[0]&&!req.body.cImage)
      {
        if(req.files[1])
        cImage=url+"/images/"+req.files[1].filename
        else
        cImage=url+"/images/"+req.files[0].filename
      }
    }
  const user=new User({
      _id:req.params.id,
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      designation:req.body.designation,
      location:req.body.location,
      cvLink:req.body.cvLink,
      about:req.body.about,
      pImage:pImage,
      cImage:cImage,
      creator:req.authData.authId
  })
  User.updateOne({ _id:req.params.id,creator:req.authData.authId},user).then(result=>{
    if(result.matchedCount>0){
      res.status(200).json({message:`User updated`});
    }
    else{
      res.status(401).json({message:"not authorized"});
    }
  })
  }

  exports.deleteUser=(req,res,next)=>{
    User.deleteOne({_id:req.params.id,creator:req.authData.authId}).then((result)=>{
      if(result.deletedCount>0){
        res.status(200).json({message:`User deleted`});
      }
      else{
        res.status(401).json({message:"not authorized"});
      }
    })
    }
