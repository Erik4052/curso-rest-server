const {response, request}  = require('express');

const getUsers = (req = request, res = response)  => {
    const query = req.query
    res.status(200).json({
        msg:'get API - Controller',
        query
    });
  }


  const updateUsers = (req, res = response)  => {
    const id = req.params.id;
    res.status(200).json({
        msg:'put API - Controller',
        id
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

  const createUsers = (req, res = response)  => {
    const body = req.body;
    res.status(200).json({
        msg:'post API - Controller',
        body
    });
  }



  module.exports = {
    getUsers,
    updateUsers,
    patchUsers,
    createUsers,
    deleteUsers
  }