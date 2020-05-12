


function signup(){

    showSpinner()


    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    var name=document.getElementById('name').value;
    // var lastName=document.getElementById('lastName').value;
    var phone=document.getElementById('phone').value;
    //alert(email)

    signup=JSON.stringify({
        'email':email,
        'password':password,
        'name':name,
        // 'lastName':lastName,
        'phone':phone,
        'role':'3'
    })

    // token=localStorage.getItem("token")

    let request=new XMLHttpRequest();
    request.open("POST","http://localhost:3000/auth/signup",true)
    // request.withCredentials = true
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // request.setRequestHeader("token",token)
    request.send(signup);


    request.onload=()=>{

        hideSpinner()

        console.log(JSON.parse(request.response));
       // console.log(JSON.parse(request.response).message);

       if(JSON.parse(request.response).message=='email sent'){
        var queryString = "?para1=" + email;
        location.href='../views/verifyEmail.html'+queryString
       }
       else snackbar(JSON.parse(request.response).message)
    }
}


