const { response } = require("express");
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generateJWT");

const login = async(req, res = response) => {
    const {email, password} =  req.body;


    try {
        // Check if email exists
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                msg:'User or Password are incorrectly - email'
            });
        }

        // Check if user is active
        if(!user.state){
            return res.status(400).json({
                msg:'User or Password are incorrectly - user'
            });
        } 

        const validPassword = bcryptjs.compareSync(password, user.password);
        // Check password
        if(!validPassword) {
            return res.status(400).json({
                msg:'User or Password are incorrectly - password'
            });
        }
        
        
        // Generate JWT 

        const token = await generateJWT(user.id);

        res.json({
            msg:'login ok',
            user,
            token
        });

    } catch (error) {
        return res.status(500).json({
            msg:`Something went wrong:${error}`
        });
    }
    
}


module.exports = {
    login
}