const { response } = require("express");
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generateJWT");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async(req = reques, res = response ) => {

    const {id_token} = req.body;

    try {

        const {name, email, picture} = await googleVerify(id_token);
        
        let user = await User.findOne({email});

        if(!user){
            const userData = {
                name,
                email,
                password:'1',
                picture,
                google:true,
                role:'USER_ROLE'
            }
            user = new User(userData);
            await user.save();
        }

        //if user in DB has false state
        if(!user.state) {
            return res.status(401).json({
                msg:'contact IT support'
            });
        }

        //generate JWT
        const token = await generateJWT(user.id)

        res.json({
            /* msg:'All good',
            id_token */
            user,
            token
        });

    } catch (error) {
        res.status(400).json({
            msg:'token unverified'
        });
    }

   
}


module.exports = {
    login,
    googleSignIn
}