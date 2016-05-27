$( "#form-signin" ).submit(function( event ) {
  event.preventDefault();
  login($("#inputLoginid").val(), $("#inputPassword").val(), function(){
  	console.log("change");
  	window.location.replace('music4you.html');
  });
});

$( "#form-signout" ).click(function( event ) {
  event.preventDefault();
  logout(function(){
  	console.log("logout");
  	window.location.replace('index.html');
  });
});