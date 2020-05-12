function tokenExistence(){
    
    if(localStorage.getItem("token")){

        token=JSON.stringify({
            'token':localStorage.getItem("token"),
            
        })

        let request=new XMLHttpRequest();
    request.open("POST","http://localhost:3000/auth/check-token-existence",true)
    // request.withCredentials = true
    // request.setRequestHeader('Content-Type', 'application/json')

    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(token);
    request.onload=()=>{
        console.log("---JSON.parse(request.response)------",JSON.parse(request.response));
        if(JSON.parse(request.response).message=="Token verified"){
            //window.location.replace("");
            //location.href='./newCredential.html'
        }
        else {localStorage.removeItem("token")
               location.href='../views/login.html'  
               console.log("remove token");
                      
    }
    }   

}
else location.href='../views/login.html'  

}


function logout(){
    localStorage.removeItem('token')
    location.href="./login.html"
}
