const express=require('express');
const router=express.Router();
const {InfoController}=require('../../controllers');
const userRouter=require('./user-routes');

router.get('/info',    InfoController.info);


router.use('/signup',userRouter);
module.exports=router;