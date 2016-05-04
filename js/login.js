//var BASE_URI = "http://127.0.0.1:8080/music4you"

$( "#form-signin" ).submit(function( event ) {
  event.preventDefault();
  login($("#inputLoginid").val(), $("#inputPassword").val(), function(){
  	console.log("change");
  	window.location.replace('index.html');
  });
});


