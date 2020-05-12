var spinner = document.getElementById("spinner");
function showSpinner() {
  console.log("spinner start");
  
    document.getElementById("spinner").classList.add("show");
    setTimeout(() => {
      document.getElementById("spinner").classList.remove("show");
    }, 5000);
  }

  function hideSpinner() {
    console.log("spinner end");
    
    document.getElementById("spinner").classList.remove("show");
}
