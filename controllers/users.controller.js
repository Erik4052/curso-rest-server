const {response, request}  = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');


const getUsers = (req = request, res = response)  => {
    const query = req.query
    res.status(200).json({
        msg:'get API - Controller',
        query
    });
  }


  const updateUsers = async(req, res = response)  => {
    const {id} = req.params;
    const {password, google, email, ...rest} = req.body;
    //Todo: validate on db 

    if(password) {
      const salt = bcryptjs.genSaltSync();
      rest.password = bcryptjs.hashSync(password, salt);
    }
    const user =  await User.findByIdAndUpdate(id, rest,{new:true});
    res.status(200).json({
        msg:'put API - Controller',
        id,
        user
    });
  }

  const deleteUsers = (req, res = response)  => {
    res.status(400).json({
        msg:'delete API - Controller'
    });
  }

  const patchUsers = (req, res = response)  => {
    res.status(200).json({
        msg:'patch API - Controller'
    });
  }

  const createUsers = async (req, res = response)  => {

    const {name, email, password, role} = req.body;
    const user =  new User({name, email, password, role});//Create the new object

    //encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(user.password, salt);
    //save in DB

    await user.save();//Create registration

    res.json({
        user
    });
  }



  module.exports = {
    getUsers,
    updateUsers,
    patchUsers,
    createUsers,
    deleteUsers
  }