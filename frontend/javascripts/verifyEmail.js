url_string=window.location.href
    var url = new URL(url_string);
    var email = url.searchParams.get("para1");
    console.log(email);



function buttons(){
    if(email==null){
        console.log(email);
        
        document.getElementById('otp').style.display="none"
        document.getElementById('otp2').style.display="none"
        document.getElementById('otp3').style.display="none"

        //document.getElementsByClassName('forgot').style="block"
    }
    else {
        document.getElementById('forgot').style.display="none"
        document.getElementById('forgot2').style.display="none"
        document.getElementById('forgot3').style.display="none"
    }
}


function sendForgot(){

    console.log("spinner");
    
    showSpinner()

    email=document.getElementById('forgot').value;
    data=JSON.stringify({
        'email':email,
    })

    let request=new XMLHttpRequest();
    request.open("POST","http://localhost:3000/auth/forgotOtp",true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(data);
    request.onload=()=>{
        hideSpinner()
    console.log(JSON.parse(request.response));
   if( JSON.parse(request.response).message=="email sent"){
   // parameter="?email="+JSON.parse(request.response).message.email   
   parameter="?email="+email 
   location.href="../views/forgot.html"+parameter
   }
   else snackbar(JSON.parse(request.response).message)    

}
}


function accountVerify(){
    showSpinner()
    var otp=document.getElementById('otp').value;
    //alert(otp)
    // var queryString = decodeURIComponent(window.location.search);
    // queryString = queryString.substring(1);
    // var email = queryString.split("&");
    // console.log(email[1]);

    
    
    
// for (var i = 0; i < queries.length; i++)
// {
//   document.write(queries[i] + "<br>");
// }
    let request=new XMLHttpRequest();
    data=JSON.stringify({
        email:email,
        otp:otp,
        reason:'emailVerify'
    })

    console.log(data);
    

    request.open("POST","http://localhost:3000/auth/verifyAccount",true)
    // request.withCredentials = true
    // request.setRequestHeader('Content-Type', 'application/json')

    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(data);
    request.onload=()=>{
        hideSpinner()
        console.log(JSON.parse(request.response));
        if(JSON.parse(request.response).message=="account verified")
            location.href="../views/login.html"
        else snackbar(JSON.parse(request.response).message)    
    }
}


