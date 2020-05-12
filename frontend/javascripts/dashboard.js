 document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(showPosition);
   
   
  } else {console.log("datetime");
  
    
    //x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
    console.log(position.coords.latitude);

    showSpinner()

    data=JSON.stringify({
       lat:position.coords.latitude,
       long:position.coords.longitude
    })

    let request=new XMLHttpRequest();
    request.open("POST","http://localhost:3000/credentials/weather",true)
    request.setRequestHeader("token",localStorage.getItem("token"))
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(data);
    request.onload=()=>{
        hideSpinner()
        console.log(JSON.parse(request.response).data.dt); 
        
        document.getElementById('temp').innerHTML=JSON.parse(request.response).data.main.feels_like


console.log(dateObj.toLocaleTimeString());

        
    }

}


function datetime(){
    console.log('function');
    
    dateObj = new Date(); 
utcString = dateObj.toUTCString(); 
// time = utcString.slice(-11, -4); 
console.log(dateObj.toDateString());
document.getElementById('date').innerHTML=dateObj.toDateString();
document.getElementById('time').innerHTML=dateObj.getHours()+"hr "+dateObj.getMinutes()+"mins"

setTimeout(datetime, 1000);

}

function records(){

showSpinner()
        let request=new XMLHttpRequest();
    request.open("POST","http://localhost:3000/credentials/get-credential",true)
    // request.withCredentials = true
    // request.setRequestHeader('Content-Type', 'application/json')
    request.setRequestHeader("token",localStorage.getItem("token"))
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send();
    request.onload=()=>{
        hideSpinner()
        console.log("---JSON.parse(request.response)------",JSON.parse(request.response));
        var GAMING=0,LIFESTYLE=0,UTILITY=0,BUSINESS=0,EDUCATIONAL=0,TRAVEL=0,ENTERTAINMENT=0

        if(JSON.parse(request.response).data.length==0){

            snackbar('No Reords Founded')

        }
        else{


        for(var i=0;i<JSON.parse(request.response).data.length;i++){
            
                if(JSON.parse(request.response).data[i].category=="GAMING APPS")
                ++GAMING
                if(JSON.parse(request.response).data[i].category=="UTILITY APPS")
                ++UTILITY
                if(JSON.parse(request.response).data[i].category=="BUSINESS APPS")
                ++BUSINESS
                if(JSON.parse(request.response).data[i].category=="EDUCATIONAL APPS")
                ++EDUCATIONAL
                if(JSON.parse(request.response).data[i].category=="LIFESTYLE APPS")
                ++LIFESTYLE
                if(JSON.parse(request.response).data[i].category=="ENTERTAINMENT APPS")
                ++ENTERTAINMENT
                if(JSON.parse(request.response).data[i].category=="TRAVEL APPS")
                ++TRAVEL
                
        }
        document.getElementById('utilitySpan').innerHTML=UTILITY
        document.getElementById('gamingSpan').innerHTML=GAMING
        document.getElementById('businessSpan').innerHTML=BUSINESS
        document.getElementById('educationalSpan').innerHTML=EDUCATIONAL
        document.getElementById('lifestyleSpan').innerHTML=LIFESTYLE
        document.getElementById('entertainmentSpan').innerHTML=ENTERTAINMENT
        document.getElementById('travelSpan').innerHTML=TRAVEL

    }
    }   

}  

