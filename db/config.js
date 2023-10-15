const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
    await mongoose.connect(process.env.MONGODB_CNN, {});  
    console.log('Connection to Database succesfully');      
    } catch (error) {
        throw new Error('Database error')
    }

}


module.exports = {
    dbConnection
}