var jwt=require('../jwt')

exports.authTokenCheck=(req,res,next)=>{

    console.log(req.headers.token);
    

    if(typeof req.headers.token==="undefined"){
        next()
    }

    else {
        jwt.verifyJwt(req.headers).then((result)=>{
            console.log(result);
            
            if(result=='Token verified'){
                res.json({
                    message:'user already login',
                    data:''
                })
            }
            else next()
        })
    }

}

exports.signup=(req,res,next)=>{

    if(req.body.email==''){
        res.json({
            message:'email is required',
            data:''
        })
    }
    
    else if(!(/\S+@\S+\.\S+/.test(req.body.email))){
       res.json({
           message:'email not valid',
           data:''
       })        
   } 

   else if( req.body.password==''){
        res.json({
            message:'password is required',
            data:''
        })
    }

    else if((req.body.password).length<5){
        res.json({
            message:'password length should be more than 5',
            data:''
        })
    }

    else if(  req.body.name==''){
        res.json({
            message:'name is required',
            data:''
        })
    }
    else if(!(/^[A-Za-z]+$/.test(req.body.name))){
        res.json({
            message:'name is not valid',
            data:''
        })
    }

    else if(  req.body.phone==''){
        res.json({
            message:'phone is required',
            data:''
        })
    }

    else if(!Number.isInteger(parseInt(req.body.phone))){
        res.json({
            message:'Invalid phone no.',
            data:''
        })
    }

    else if(  req.body.role==''){
        res.json({
            message:'Role is required',
            data:''
        })
    }

    else if(!Number.isInteger(parseInt(req.body.role)) || Number.isInteger(parseInt(req.body.role))<1 || Number.isInteger(parseInt(req.body.role))>3 ){
        res.json({
            message:'Invalid role ',
            data:''
        })
    }


    else
     next()

}

exports.login=(req,res,next)=>{

//     if(req.body.email==''){
//         res.json({
//             message:'email is required',
//             data:''
//         })
//     }
    
//     else if(!(/\S+@\S+\.\S+/.test(req.body.email))){
//        res.json({
//            message:'email not valid',
//            data:''
//        })        
//    } 

//    else if( req.body.password==''){
//         res.json({
//             message:'password is required',
//             data:''
//         })
//     }

//     else if((req.body.password).length<5){
//         res.json({
//             message:'password length should be more than 5',
//             data:''
//         })
//     }

//     else
     next()

}

exports.verifyAccount=(req,res,next)=>{
   
//     if(req.body.email==''){
//         res.json({
//             message:'email is required',
//             data:''
//         })
//     }
    
//     else if(!(/\S+@\S+\.\S+/.test(req.body.email))){
//        res.json({
//            message:'email not valid',
//            data:''
//        })        
//    } 

//     else if(  req.body.otp==''){
//         res.json({
//             message:'otp is required',
//             data:''
//         })
//     }

//     else if(!Number.isInteger(parseInt(req.body.otp))){
//         res.json({
//             message:'Invalid otp no.',
//             data:''
//         })
//     }

//else 
 next()
}