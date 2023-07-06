document.getElementById("startBtn").addEventListener("click", function() {
    var div1 = document.getElementById("game-page");
    var div2 = document.getElementById("instructions");
  
    if (div1.style.display === "none") {
      div1.style.display = "block";
      div2.style.display = "none";
    } else {
      div1.style.display = "none";
      div2.style.display = "block";
    }
  });
  
function game(){

}