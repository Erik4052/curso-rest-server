const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User =  require('../models/user');



const validateJWT = async(req = request, res =  response, next) => {
    const token = req.header('x-token');
    //console.log(token);
    if(!token) {
        return res.status(401).json({
            msg:'no token on request'
        });
    }

    try {
        const {uid} = jwt.verify(token,process.env.SECRETPRIVATEKEY);
        

        const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                msg:'user undefined'
            });
        }
        //check if user has true state
        if(!user.state){
            return res.status(401).json({
                msg:'User has false state'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Invalid token'
        });
    }
    
    
}



module.exports = { 
    validateJWT
}