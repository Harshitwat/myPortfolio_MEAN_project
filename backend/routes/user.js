const express=require('express');

const router=express.Router();
const extractFile =require(`../middleware/file`);
const checkAuth =require(`../middleware/check-auth`);
const UserController=require('../controllers/user')

router.post('',checkAuth,extractFile,UserController.createUser)

router.put('/:id',checkAuth,extractFile,UserController.editUser)

router.get('/:id',UserController.getUser)

router.get('',UserController.getUsers)

router.delete('/:id',checkAuth,UserController.deleteUser)

module.exports=router;
