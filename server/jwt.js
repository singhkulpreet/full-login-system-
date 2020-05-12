const jwt=require('jsonwebtoken')


exports.createJwt=(data)=>{

    console.log('---jwt---',data);
    

    return new Promise((resolve,reject)=>{

    jwt.sign(data, 'loginToken', (err, token) => {
        if (err) {
            console.log(err);
            
          resolve({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          //req.decoded = decoded;
          console.log("----token===== ",token);
          
          resolve({token:token})
        }
      });
    })
}

exports.verifyJwt=(data)=>{

    console.log(data);
    
return new Promise((resolve,reject)=>{


     jwt.verify(data.token, 'loginToken',(err,data)=>{

        console.log("--data--",data,err);
        
        if(err)
          resolve('Invalid Token');
        else resolve('Token verified')          
      });
    })  
}