const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const db = require('../models');
const userService = require('../service/userService');

/* GET users listing. */
router.post('/', async(req, res) => {
  try{
    const params = {
      name : req.body.name,
      password : req.body.password,
      userid : req.body.userid,
      role : req.body.role,
      email : req.body.email,
      phone : req.body.phone,
      departmentId : req.body.departmentId
    }
    logger.info(`(user.reg.params) ${JSON.stringify(params)}`);
    
    if(!params.name || !params.userid || !params.password){
      const err = new Error('Not allowed null (name)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }
    const result = await userService.reg(params);
    logger.info(`(user.reg.result) ${JSON.stringify(result)}`);
    
    res.status(200).json(result);
  }catch(err){
    res.status(500).json({ err: err.toString() });
  }
});

router.get('/',async(req,res)=>{
  try{
    const params = {
      name: req.query.name
    };
    logger.info(`(user.list.params) ${JSON.stringify(params)}`);
    
    const result = await userService.list(params);
    logger.info(`(user.list.result) ${JSON.stringify(result)}`);

    res.status(200).json(result);
  }catch(err){
    res.status(500).json({ err: err.toString() });
  }
})

module.exports = router;
