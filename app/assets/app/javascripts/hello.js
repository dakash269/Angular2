$( document ).ready(function() {
  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
      var eleDiv = document.getElementById("ver");
      if(eleDiv.style.visibility == "visible") {eleDiv.style.visibility = "hidden";}
      else {eleDiv .style.visibility = "visible";}
  })
});

