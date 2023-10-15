const {Schema, model} = require('mongoose');



const RolesSchema = new Schema({
    role:{
        type: String,
        required:[true,'Role is required']
    }
});


module.exports = model('Role', RolesSchema)