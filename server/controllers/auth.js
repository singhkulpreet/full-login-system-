const userModel=require('../models/userInfo')
const nodemailer=require('nodemailer')
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const accountVerifyModel=require('../models/accountVerify')
const jwt=require('../jwt')
var constants=require('../constants')

exports.signup=(data)=>{

    console.log("---data---",data);
    
    return new Promise((resolve,reject)=>{

        userModel.findOne({email:data.email}).then((result1)=>{

            console.log('result1',result1);
            
            if(result1==null){
                // 1. create user
                // 2. send verification email

                userModel.create({name:data.name,email:data.email,password:cryptr.encrypt(data.password),phone:data.phone,role:data.role,dp:data.dp}).then((result2)=>{

                    console.log("result2",result2);
                    
                    if(result2==null)
                        resolve('user not created')
                    
                    //else resolve("user created but not verified")
                    else {
                        email(data,constants.EMAILVERIFY).then((resu)=>{
                            resolve(resu)
                           }).catch(err=>{
                               console.log(err);
                           })
                    }
                    
                }).catch((err)=>{
                    console.log(err);
                })
            }
            else if(result1!=null){

               if(result1.isVerified==true){

                    resolve("account already registered")
               }
               else if(result1.isVerified==false){
                    console.log("email");

                //verification email
                   email(data,constants.EMAILVERIFY).then((result3)=>{

                        if(result3){
                            ///////////////////////////////////////
                            resolve(result3)
                        }
                        else resolve("Email not sent")

                   }).catch(err=>{
                       console.log(err);
                   })
               }
            }
            else resolve(result1)

        }).catch((err)=>{
            console.log(err);
        })
    })
}


email=(data,reason)=>{
   
   return new Promise((resolve,reject)=>{

            rand=Math.floor((Math.random() * 100) + 54);

             // all neccassary things for sending mail
             host='smpt.gmail.com';
             link="http://"+host+"/verify?id="+rand;
         
             mailOptions={
                 to : data.email,
                 subject : "Please confirm your Email account",
                 html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a><br><h1>OTP:"+rand+"<h1>"
             }
             console.log(mailOptions);       
         
             mailConfig = {
                 service: "gmail",
                 host: 'smpt.gmail.com',
                 port: 465,
                 secure: true,
                 auth: constants.CREDENTIALS
             };
         
             let transporter = nodemailer.createTransport(mailConfig);
                
             transporter.sendMail(mailOptions, function(error, info){

                if(error){
                    console.log(error);
                    return error
                }
                else if(info){

                console.log('-----info----',info);

                otp(data.email,rand,reason).then((result4)=>{

                    if(result4)
                        resolve(result4)
                    else resolve('not created')

                }).catch(err=>{
                    console.log(err);
                })
                }
             })
        })     
}


otp=(email,otp,reason)=>{

console.log("---otp()---",email,otp,reason);
    
    return new Promise((resolve,reject)=>{

        accountVerifyModel.create({email:email,reason:reason,otp:otp}).then(result4=>{

            console.log('---result4---',result4);
            
            if(result4)
                resolve('email sent')
            
            else resolve("not created in accountVerifyModel")    

        }).catch(err=>{
            console.log(err);
        })
    })
}



exports.login=(data)=>{

    console.log('------constants.credentials-------',constants.credentials);
    

    console.log(data);

   return new Promise((resolve,reject)=>{

        userModel.findOne({email:data.email}).then(result=>{

            if(result==null)
                resolve("user not registered")
            
            else {

                console.log(result.email,"   password---->  ",cryptr.decrypt(result.password));

                if(cryptr.decrypt(result.password)==data.password){
                 
                 jwt.createJwt({email:result.email,role:result.role}).then(result2=>{

                    console.log("------result2------ ",result2.token);
                    

                    if(typeof result2.token==="undefined"){
                         resolve("token not generated") 
                    }
                    else resolve({token:result2.token})     

                 })

                }
                else resolve("wrong credentials")
            }    
        }).catch(err=>{
            console.log(err);
        })
   })
}


exports.verifyAccount=(data)=>{

    return new Promise((resolve,reject)=>{   

    accountVerifyModel.findOne({email:data.email,otp:data.otp,reason:data.reason}).then((result)=>{

        if(result==null){
            resolve("otp expired or invalid")
        }
        else {

                if(data.reason==constants.EMAILVERIFY){

                            userModel.findOneAndUpdate({email:data.email,isVerified:false},{$set:{isVerified:true}}).then(result2=>{

                                if(result2==null)
                                    resolve('account not available')
                                else resolve('account verified')    
                
                            }).catch(err=>{
                                console.log(err);
                            })                   
                }

                else if(data.reason==constants.FORGOTPASSWORD){


                        if(data.confirmPassword==data.newPassword){
                            userModel.findOneAndUpdate({email:data.email,isVerified:true},{$set:{password:cryptr.encrypt(data.newPassword)}}).then(result2=>{

                                if(result2==null)
                                    resolve('account not available')
                                else resolve('password changed')    
                
                            }).catch(err=>{
                                console.log(err);
                            })
                        }
                        else resolve("new and confirm password not same")
                    
                }
        }   

    }).catch(err=>{
        console.log(err);
    })
})
}

exports.forgotOtp=(data)=>{
    
    return new Promise((resolve,reject)=>{

        email(data,constants.FORGOTPASSWORD).then((result3)=>{

            if(result3){
                ///////////////////////////////////////
                resolve("email sent")
            }
            else resolve("Email not sent")

       }).catch(err=>{
           console.log(err);
       })

    })

}

