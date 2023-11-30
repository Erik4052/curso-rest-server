const {Schema, model} = require('mongoose');



const CategoySchema = new Schema({
    name: {
        type: String,
        required:[true, 'categoryName is required'],
        unique:true
    },
    state: {
        type:Boolean, 
        default:true,
        required:true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
});


module.exports = model('Category', CategoySchema)