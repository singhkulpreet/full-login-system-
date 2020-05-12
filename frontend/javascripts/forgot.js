
url_string=window.location.href
    var url = new URL(url_string);
    var email = url.searchParams.get("email");
    console.log(email);


    

function changePassword(){

    showSpinner()    

        newPassword=document.getElementById('new').value;
        confirmPassword=document.getElementById('confirm').value;
        otp=document.getElementById('otp').value;

        data=JSON.stringify({
            'email':email,
            'otp':otp,
            'newPassword':newPassword,
            'confirmPassword':confirmPassword,
            'reason':'forgotPassword'
        })
    
        let request=new XMLHttpRequest();
        request.open("POST","http://localhost:3000/auth/verifyAccount",true)
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(data);
        request.onload=()=>{
            hideSpinner()
        console.log(JSON.parse(request.response));
       if(JSON.parse(request.response).message!=null && JSON.parse(request.response).message.email!==undefined){
        parameter="?email="+JSON.parse(request.response).message.email   
        location.href="./login.html"
       }
       else snackbar(JSON.parse(request.response).message)
    }
}    
