const Role = require('../models/role');
const User = require('../models/user');

const validRole = async(role = '') => {
    const roleExists = await Role.findOne({role});
    if(!roleExists) throw new Error(`Role: ${role} is not registered in Database`);
  }

const existEmail = async( email = '') => {

    const emailExist = await User.findOne({email});
    if(emailExist){
      throw new Error(`email: ${email} is already registered`);
    }
}


  module.exports = {validRole, existEmail};