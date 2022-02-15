const { Op } = require('sequelize');
const { User } = require('../models/index');

const dao = {
  insert(params){
    return new Promise((resolve, reject) => {
      User.create(params).then((inserted) => {
        const insertedResult = { ...inserted };
        delete insertedResult.dataValues.password;
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  selectList(params){
    const setQuery = {};

    if(params.name){
      setQuery.where = {
        ...setQuery.where,
        name : { [Op.like]: `%${params.name}%`},
      };
    }
    if(params.userid){
      setQuery.where = {
        ...setQuery.where,
        userid : { [Op.like]: `%${params.userid}%`}
      };
    }

    setQuery.order = [['id','DESC']];

    return new Promise((resolve, reject)=>{
      User.findAndCountAll({
        ...setQuery,
      }).then((selectedList) => {
        resolve(selectedList);
      }).catch((err) => {
        reject(err);
      })
    });
  }
}

module.exports = dao