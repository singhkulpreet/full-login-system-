



function loginVerify(){
    showSpinner()
    var email=document.getElementById('uname').value;
    var password=document.getElementById('psw').value;
    //alert(email)
    login=JSON.stringify({
        'email':email,
        'password':password,
    })
    let request=new XMLHttpRequest();
    request.open("POST","http://localhost:3000/auth",true)
    // request.withCredentials = true
    // request.setRequestHeader('Content-Type', 'application/json')

    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(login);
    request.onload=()=>{
        hideSpinner()
        console.log("----request.response------",JSON.parse(request.response));
        if(JSON.parse(request.response).message="login succesully" && JSON.parse(request.response).data!=""){
            if (typeof(Storage) !== "undefined") {

               // if(request.response.token!="wrong credentials"){
            console.log("----request.------",JSON.parse(request.response).data.token);
            localStorage.setItem("token",JSON.parse(request.response).data.token)
            console.log('--------local storage-----',localStorage.getItem("token"))
            location.href='../views/dashboard.html'
                
                
                 }
             else  {
                 snackbar(JSON.parse(request.response).message) 
                 console.log(JSON.parse(request.response).data);}
                
         }
         else {
            console.log("else");
            snackbar(JSON.parse(request.response).message)        
            console.log(JSON.parse(request.response).message);}
    }
}

