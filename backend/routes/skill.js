const express=require('express');
const checkAuth =require(`../middleware/check-auth`);
const router=express.Router();
const Controller=require('../controllers/skill')

router.post('',checkAuth,Controller.addSkill);
router.get('/:userId',Controller.getSkill)
router.delete('/:id',Controller.deleteSkill);



module.exports=router;
