var usere
$(function(){
   getCurrentUserProfile(function(user){
	$("#stings-list").empty();
      $("#stings-list").append(listItemHTML(user.loginid, user.fullname, user.email));
      $("#aProfile").text(user.fullname + ' ');
      $("#aProfile").append('<span class="caret"></span>');
	   usere = user.id;
   });

});


  



 $("#deleteee").click(function(e){

	e.preventDefault();
      e.stopImmediatePropagation();
      console.log(usere);
      alert("Usuario borrado correctamente");
  EliminarUsuario( function(){
    window.location.replace('index.html');
  });

    });

$("#aCloseSession").click(function(e){
  e.preventDefault();
  logout(function(){
    window.location.replace('index.html');
  });
});

function listItemHTML(loginid, fullname, email, phone ){
 
  var loginid = '<h4 class="list-group-item-info label-primary unclickable" align="center">' +loginid+ '</h6>';
  var fullname = '<h4 class="list-group-item-info unclickable" align="center">' +fullname+ '</h6>';
  var email = '<h4 class="list-group-item-info unclickable" align="center">' +email+ '</h6>';
 //var phone = '<h6 class="list-group-item-heading unclickable" align="center">' +phone+ '</h6>';
  return '  <span class="label label-default">Nombre de usuario</span>' +'<br><br>'+ loginid + '  <span class="label label-default">Nombre completo</span>' +'<br><br>' + fullname + '  <span class="label label-default">Email</span>' +'<br><br>' + email/*+ 'Teléfono de contacto'+ phone*/ ;
}



$('#canceldeleteprofile').click(function(e){
  //var usernametodelete =getCookie('username');
  e.preventDefault();

$("#result").text(' ');
 window.location.replace("perfil.html"); 
});
/*
$('#deleteprofilefinal').click(function(e){
  //var usernametodelete =getCookie('username');
  e.preventDefault();
  $("#result").text(' ');
      
  deleteUser(usernametodelete);
        
  
});

*/

function deleteUser(user) {
var authToken = JSON.parse(sessionStorage["auth-token"]);
    var url = authToken["links"]["user-profile"].uri;

console.log(url);
  
  //$('#searchtab').text('');

  $.ajax({
    url : url,
    type : 'DELETE',
    crossDomain : true,

    dataType : 'json',
  }).done(function(data, status, jqxhr) {


   alert('Usuario eliminado correctamente.');
   window.location.replace("index.html");        
      }).fail(function() {
         alert('No se ha podido elimiar la cuenta');
  });

}
