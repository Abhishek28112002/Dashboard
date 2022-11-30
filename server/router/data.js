const express=require("express")
const Model=require('../models/Model');
const router=express.Router();
router.post('/post',async(req,res)=>{
    try{
  result= await Model.insertMany(req.body)
   res.send(result);
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})
router.get('/get',async(req,res)=>{
   Model.find(({}),function(err,result){
    res.send(result);
   }
   )
})
module.exports = router ;
