$(function(){
   getCurrentUserProfile(function(user){
	$("#stings-list").empty();
      $("#stings-list").append(listItemHTML(user.loginid, user.fullname, user.email, user.phone));
      $("#aProfile").text(user.fullname + ' ');
      $("#aProfile").append('<span class="caret"></span>');
	   
   });

});

 $("#buttonRegresar").click(function(){window.location.replace('indexusuario.html')});

   $("#formPrevious").submit(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
     // previousStings();
      $("#buttonVerhabitaciones").blur();
	window.location.replace('listrooms.html');
    });

   $("#formEliminarusuario").submit(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
  EliminarUsuario(function(){

  });

 logout(function(){
 });
 $("#deleteprofilefinal").blur();
	window.location.reload();
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
 var phone = '<h6 class="list-group-item-heading unclickable" align="center">' +phone+ '</h6>';
  return 'Nombre de Usuario' + loginid + 'Nombre completo' + fullname + 'Correo electrónico' + email+ 'Teléfono de contacto'+ phone ;
}



$('#canceldeleteprofile').click(function(e){
  //var usernametodelete =getCookie('username');
  e.preventDefault();

$("#result").text(' ');
 window.location.replace("micuenta.html"); 
});
/*
$('#deleteprofilefinal').click(function(e){
  //var usernametodelete =getCookie('username');
  e.preventDefault();
  $("#result").text(' ');
      
  deleteUser(usernametodelete);
        
  
});

*/

function deleteUser(usernametodelete) {
var url = API_BASE_URL + 'users/' + username;

console.log(url);
  
  $('#searchtab').text('');

  $.ajax({
    url : url,
    type : 'DELETE',
    crossDomain : true,

    dataType : 'json',
  }).done(function(data, status, jqxhr) {


   alert('Usuario eliminado correctamente, Esperamos volver a verle algún día');
   window.location.replace("signin.html");        
      }).fail(function() {
         alert('No se ha podido borrar');
  });

}
