const mongoose = require('mongoose');
var schema = mongoose.Schema
mongoose.connect('mongodb://localhost:27017/pos', {useNewUrlParser: true, useUnifiedTopology: true})

const userInfo=new schema({
    name:String,
    email:String,
    password:String,
    phone:String,
    dp:String,
    role:String,
    isVerified:{type:Boolean,default:false}
})

var userModel=mongoose.model('userInfo',userInfo)

module.exports=userModel