const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema =mongoose.Schema({
    name:{type:String},
    email:{
        type:String,
        unique:true
    },
    password:{type:String}
})

userSchema.methods.compareUserPassword = async (inputtedPassword, hashedPassword) => {
    return await bcrypt.compare(inputtedPassword, hashedPassword)
}

const User = mongoose.model('User', userSchema)
module.exports = { User }