const logger = require('../lib/logger');
const userDao = require('../dao/userDao');

const service = {
  async reg(params){
    let inserted = null;

    try{
      inserted = await userDao.insert(params);
      logger.debug(`(userService.reg) ${JSON.stringify(inserted)}`);
      return new Promise((resolve)=>{
        resolve(inserted);
      })
    }catch(err){
      logger.error(`(userService.reg) ${err.toString()}`);
      return new Promise((resolve, reject)=>{
        reject(err);
      })
    }
  },
  async list(params){
    let result = null;
    try{
      result = await userDao.selectList(params);
      logger.debug(`(userService.list) ${JSON.stringify(result)}`)
      return new Promise((resolve)=>{
        resolve(result);
      })
    }catch(err){
      logger.error(`(userService.list) ${err.toString()}`);
      return new Promise((resolve, reject)=>{
        reject(err);
      })
    }
  }
}

module.exports = service;