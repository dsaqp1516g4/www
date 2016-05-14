$( "#form-register" ).submit(function( event ) {
  event.preventDefault(); 

  
	if (document.getElementById("email").value.indexOf('@') == -1) 
	{
        $('<div class="alert alert-success"> <strong>Error!</strong> Escriba un campo de emáil válido (¿Olvidó escribir "@"?)</div>').appendTo($("#result"));
		 
	}


	else if (document.getElementById("email").value.indexOf('.') == -1) 
	{
		$('<div class="alert alert-success"> <strong>Error!</strong> Escriba un campo de emáil válido (¿Olvidó escribir el punto?)</div>').appendTo($("#result"));
		
	}
	
	else{

  registrarUsuario($('#loginid').val(), $('#password').val(), $('#fullname').val(), $('#email').val(), function(){
  	console.log("change");
  	window.location.replace('index.html');
	  });
  //login($('#loginid').val(), $('#password').val(), function(){
  //      console.log("login");
  //      window.location.replace('music4you.html');
	});
});

