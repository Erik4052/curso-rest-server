const { response, request } = require("express")


const isAdminRole = (req = request,res = response, next) => {
    
    if(!req.user){
        return res.status(500).json({
            msg:'User undefined for user role'
        });
    }

    const {role, name} = req.user;

    if(role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg:`${name} is not admin`
        });
    }

    next();
}

const hasRole = (...roles) => {
    return (req= request,res =response, next) => {
        if(!req.user){
            return res.status(500).json({
                msg:'User undefined for user role'
            });
        }


        if(!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg:`Service requires one of these roles: ${roles}`
            });
        }
        next();
    }
}


module.exports = {isAdminRole, hasRole}