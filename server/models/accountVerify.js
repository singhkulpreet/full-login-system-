var mongoose=require('mongoose')
var Schema=mongoose.Schema
mongoose.connect('mongodb://localhost:27017/pos', {useNewUrlParser: true, useUnifiedTopology: true});

const accountVerify = new Schema({
    email:String,
    otp:String,
    //role:String,
    reason:String,
    expire_at: {
        type: Date, 
        default: Date.now
    , expires: '10m'
    },
   }, {
    timestamps: true,
   });

  var accountVerifyModel=mongoose.model('accountVerify',accountVerify)

   module.exports=accountVerifyModel


