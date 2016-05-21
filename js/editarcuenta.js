$(function(){
   getCurrentUserProfile(function(user){

	    $("#stings-list").empty();
      $("#stings-list").append(listItemHTML(user.loginid, user.fullname, user.email, user.phone));
      $("#aProfile").text(user.fullname + ' ');
    	$('#loginid').val(user.loginid);
    	$('#fullname').val(user.fullname);
    	$('#email').val(user.email);
    	$("#aProfile").append('<span class="caret"></span>');
    	   
   });
});

$("#result").text('');
$( "#editar" ).submit(function( event ) {
  event.preventDefault(); 


  //filtro para correcto ingreso del email en actualizar usuario

  if (document.getElementById("email").value.indexOf('@') == -1) 
  { 
        $('<div class="alert alert-danger"> <strong>Error!</strong> Escriba un campo de emáil válido (¿Olvidó escribir "@"?)</div>').appendTo($("#result"));
     
  }
  else if (document.getElementById("email").value.indexOf('.') == -1) 
  {
    $('<div class="alert alert-danger"> <strong>Error!</strong> Escriba un campo de emáil válido (¿Olvidó escribir el punto?)</div>').appendTo($("#result"));
    
  }
  
    else {

    putUsuario($('#loginid').val(), $('#fullname').val(), $('#email').val(), function(){
    //console.log("change");
    window.location.replace('miperfil.html');
   });
            $('<div class="alert alert-success"> <strong>OK!</strong> Se ha actualizado tu cuenta</div>').appendTo($("#result"));

  }
});

   $("#buttonRegresar").click(function(){window.location.replace('miperfil.html')});

   $("#formPrevious").submit(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
     // previousStings();
      $("#buttonVerhabitaciones").blur();
	window.location.replace('micuenta.html');
    });

   $("#formEliminarusuario").submit(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
      EliminarUsuario(function(){
      });
     logout(function(){
      });
          $("#buttonEliminarusuario").blur();
    	window.location.replace('login.html');
        });

$("#aCloseSession").click(function(e){
  e.preventDefault();
  logout(function(){
    window.location.replace('index.html');
  });
});

function listItemHTML(loginid, fullname, email, phone ){
 
  var loginid = '<h6 class="list-group-item-heading unclickable" align="center">' +loginid+ '</h6>';
  var fullname = '<h6 class="list-group-item-heading unclickable" align="center">' +fullname+ '</h6>';
  var email = '<h6 class="list-group-item-heading unclickable" align="center">' +email+ '</h6>';
  return loginid +  fullname +email ;
}
