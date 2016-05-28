var BASE_URI = "http://192.168.1.107:8080/music4you"
var userid
var loginid

$(function(){
   getCurrentUserProfile(function(user){

      //$("#stings-list").empty();
      $("#aProfile").text(user.fullname + ' ');
      $('#loginid').text(user.loginid);
     userid = user.id;
     loginid = user.loginid;
     authToken = user.authToken;

   });
});



$( "#buttonEnviarmensaje" ).click(function( event ) {
  event.preventDefault();
  enviarMessage(userid,  loginid, $('#text').val(), $('#destinatario').val(), function(){
    console.log("change");
    alert(id);
    window.location.replace('music4you.html');
  });
});

function enviarMessage(userid, loginid, text,destinatario,  complete){
  var authToken = JSON.parse(sessionStorage["auth-token"]);
    console.log(authToken.token);
         console.log(userid);

    var nuevoMensaje = new Object();
    nuevoMensaje.userid = userid;
    nuevoMensaje.loginid=loginid;
    nuevoMensaje.text=text;
    nuevoMensaje.destinatario=destinatario;
    console.log(nuevoMensaje);

    //var uri = JSON.parse(sessionStorage["uri-rooms2"]);
    var uri= BASE_URI +'/message';
    console.log(uri);
    $.ajax({
    type: 'POST',
    url: uri,
    crossDomain : true,
    dataType : 'json',
    data: nuevoMensaje,
        contentType: "application/x-www-form-urlencoded", 
        headers: {
            "X-Auth-Token":authToken.token
        }
    
    }).done(function(text) { 
       // flat.links = linksToMap(flat.links);
        console.log(text);
        alert("DONE");
        complete();
    }).fail(function(jqXHR, textStatus, errorThrown){   
            var error = jqXHR.responseJSON;
                alert(error.reason);

    });
}


function getCurrentUserProfile(complete){
  var authToken = JSON.parse(sessionStorage["auth-token"]);
  var uri = authToken["links"]["user-profile"].uri;
  $.get(uri)
    .done(function(user){
                        userglobal=user;
      user.links = linksToMap(user.links);
      complete(user);
    })
    .fail(function(){});
}