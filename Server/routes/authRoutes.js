const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');

router.get('/test',(req,res)=>{
  console.log("this is test pro")
  res.send('this is test')
})

router.post('/api/v1/user/signup',async (req,res)=>{
   
  console.log('req.body', req.body)
    const {email,password} = req.body;

    try{
      const user = new User({email,password});
      await  user.save();
      const token = jwt.sign({userId:user._id},jwtkey)
      res.send({token})

    }catch(err){
      return res.status(422).send(err)
    }
    
    
})

router.post('/api/v1/user/signin',async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).send({error :"must provide email or password"})
    }
    const user = await User.findOne({email})
  //  console.log('user',user)
    if(!user){
        return res.status(422).send({error :"must provide email or password"})
    }
    try{
      await user.comparePassword(password);    
      const token = jwt.sign({userId:user._id},jwtkey)
      res.send({token})
    }catch(err){
        return res.status(422).send({error :"must provide email or password"})
    }
    


})


module.exports = router