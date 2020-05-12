const express=require('express')
const router=express.Router()
var authValidator=require('../validators/auth')
var authCtrl=require('../controllers/auth')
const bodyParser = require('body-parser');
var constants=require('../constants')
var jwt=require('../jwt')

// support parsing of application/json type post data
router.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));


router.post('/signup',authValidator.authTokenCheck,authValidator.signup,(req,res)=>{

    data={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone,
        dp:req.body.dp,
        role:req.body.role
    }
    
    authCtrl.signup(data).then((result)=>{

        console.log('-----result----',result);
        
        res.json({
            message:result,
            data:''
        })

    }).catch((err)=>{
        console.log(err);
    })

})

//LOGIN
router.post('/',authValidator.authTokenCheck,authValidator.login,(req,res)=>{
    data={
        email:req.body.email,
        password:req.body.password
    }    

    authCtrl.login(data).then((result)=>{

        console.log(result);
        if(typeof result.token==="undefined"){
            res.json({
                message:result,
                data:''
            })
        }
        else {
            res.json({
                message:'login succesully',
                data:result
            })
        }
    

    }).catch((err)=>{
        console.log(err);
    })

})

//verify Account and for forgot password
router.post('/verifyAccount',authValidator.authTokenCheck,authValidator.verifyAccount,(req,res)=>{

    console.log(req.body);
    

    if(req.body.reason==constants.EMAILVERIFY){
        data={
            email:req.body.email,
            otp:req.body.otp,
            reason:req.body.reason,
        }
    }
    else if(req.body.reason==constants.FORGOTPASSWORD){
        data={
            email:req.body.email,
            otp:req.body.otp,
            reason:req.body.reason,
            //currentPassword:req.body.currentPassword,
            confirmPassword:req.body.confirmPassword,
            newPassword:req.body.newPassword,
        }
    }



    authCtrl.verifyAccount(data).then(result=>{

        console.log(result);
        res.json({
            message:result,
            data:''
        })
    }).catch((err)=>{
        console.log(err);
    })

})


router.post('/forgotOtp',authValidator.authTokenCheck,(req,res)=>{

    data={
        email:req.body.email
    }

    authCtrl.forgotOtp(data).then(result=>{
        res.json({
            message:result,
            data:''
        })
    })
})

router.post('/check-token-existence',(req,res)=>{    

    jwt.verifyJwt(req.body).then(result=>{

        console.log(result);
        
        res.json({
            message:result,
            data:''
        })
    })
})

module.exports=router