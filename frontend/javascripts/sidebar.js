
    openNav();
    
    function openNav() {
      document.getElementById("mySidebar").style.width = "200px";
      document.getElementById("main").style.marginLeft = "200px";
      document.getElementById("closebtn").style.display = "block";
      document.getElementById("openbtn").style.display = "none";
    }
    
    function closeNav() {
      document.getElementById("mySidebar").style.width = "0";
      document.getElementById("main").style.marginLeft= "0";
        document.getElementById("closebtn").style.display = "none";
      document.getElementById("openbtn").style.display = "block";
    }
    
