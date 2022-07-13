const express=require('express');
const checkAuth =require(`../middleware/check-auth`);
const router=express.Router();
const PSController=require('../controllers/primarySkills')

router.post('',checkAuth,PSController.addPrimarySkills);
router.get('/:userId',PSController.getPrimarySkills)
router.delete('/:id',PSController.deletePS);



module.exports=router;
