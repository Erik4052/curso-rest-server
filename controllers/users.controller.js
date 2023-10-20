const {response, request}  = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');


const getUsers = async(req = request, res = response)  => {
    const {limit = 5, from = 0} =  req.query;
    const query = {state:true};

    /* const users = await User.find(query)
                            .skip(from)
                            .limit(limit);
    const totalUsers = await User.countDocuments(query);
 */
    const [totalUsers, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query)
          .skip(from)
          .limit(limit)
    ]);
    
    res.status(200).json({
        totalUsers,
        users
        
    });
  }


  const updateUsers = async(req, res = response)  => {
    const {id} = req.params;
    const {_id, password, google, email, ...rest} = req.body;
    //Todo: validate on db 

    if(password) {
      const salt = bcryptjs.genSaltSync();
      rest.password = bcryptjs.hashSync(password, salt);
    }

    const user =  await User.findByIdAndUpdate(id, rest,{new:true});
    res.status(200).json({
        user
    });
  }

  const deleteUsers = async(req, res = response)  => {

    const id = req.params.id;
    //const uid = req.uid;
    //physic delete
    //const userDeleted = await User.findByIdAndDelete(id);

    const userDeleted = await User.findByIdAndUpdate(id, {state:false}, {new:true});
    const userAuthenticated = req.user;

    //const params = req.params; params with the structure: "/:id", we get the queries, comming from the url like: users?id=1234
    res.status(400).json({
       userDeleted,
       userAuthenticated
       //id,
       //uid
        //params
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