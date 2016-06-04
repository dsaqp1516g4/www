var BASE_URI = "http://192.168.1.107:8080/music4you"
var WEBSERVER = "./img/"
var UPLOADFOLDER = "file:///home/hixam/Escritorio/music4you/"
var userglobal;
var dInput;


$(function(){
    
});

function linksToMap(links){
	var map = {};
	$.each(links, function(i, link){
		$.each(link.rels, function(j, rel){
			map[rel] = link;
		});
	});

	return map;
}

function loadFlats(uri, complete){

	var authToken = JSON.parse(sessionStorage["auth-token"]);
	var uri = authToken["links"]["current-flat"].uri;
	console.log(authToken.token);
	$.ajax({        
		    	type: 'GET',
		   		url: uri,
		    	headers: {
				"X-Auth-Token":authToken.token
		    	}    
		    }).done(function(flats){
			flats.links = linksToMap(flats.links);
			complete(flats);
		})
		.fail(function(){});

}


function loadAPI(complete){
	$.get(BASE_URI)
		.done(function(data){
			var api = linksToMap(data.links);
			sessionStorage["api"] = JSON.stringify(api); // A veces falla en Firefox: SecurityError: The operation is insecure. (también con Beeter, no es fallo nuestro)
			complete();

		})
		.fail(function(data){

		});
} 

/*       *
 *       *
 * LOGIN *
 *       *
 *       */

function login(loginid, password, complete){
    console.log("function login: "+loginid+" amb password: " +password+" complete: "+complete)
	loadAPI(function(){
        if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
  alert("ok");
} else {
  alert('The File APIs are not fully supported in this browser.');
}
		var api = JSON.parse(sessionStorage.api);
		//var uri = api.login.uri;
                var uri = BASE_URI+"/login";
		$.post(uri,
			{
				login: loginid,
				password: password
			}).done(function(authToken){
				authToken.links = linksToMap(authToken.links);
				sessionStorage["auth-token"] = JSON.stringify(authToken);
                    console.log(authToken.token);
alert("to");
                               // window.location.replace("miperfil.html");
				complete();
			}).fail(function(jqXHR, textStatus, errorThrown){
				var error = jqXHR.responseJSON;
				alert(error.reason);
			}
		);
	});
}

function logout(complete){
	var authToken = JSON.parse(sessionStorage["auth-token"]);
	var uri = authToken["links"]["logout"].uri;
	console.log(authToken.token);
	$.ajax({
    	type: 'DELETE',
   		url: uri,
    	headers: {
        	"X-Auth-Token":authToken.token
    	}
    }).done(function(data) { 
    	sessionStorage.removeItem("api");
    	sessionStorage.removeItem("auth-token");
    	complete();
  	}).fail(function(){
            window.alert("Falló el cierre de sesión");
        });
} 

/*         *
 *         *
 * USUARIO *
 *         * 
 *         */

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

function registrarUsuario (loginid, password, fullname, email, complete){
    loadAPI(function(){
        var api = JSON.parse(sessionStorage.api);
        var uri= BASE_URI + "/users";
        
    $.post(uri,
                        {
				loginid: loginid,
				password: password,
				fullname: fullname,
				email: email
				

			}).done(function(authToken){
				authToken.links = linksToMap(authToken.links);
				sessionStorage["createUser"] = JSON.stringify(authToken);
				complete();
			}).fail(function(jqXHR, textStatus, errorThrown){
				var error = jqXHR.responseJSON;
				alert(error.reason);
			}
		);
	});
}

function putUsuario(loginid, fullname, email, complete){
	var authToken = JSON.parse(sessionStorage["auth-token"]);
	var uri = authToken["links"]["user-profile"].uri;
	var id= authToken.userid;
	var usuariojson= "application/vnd.dsa.music4you.user+json";

	var data = {"id":id,"loginid":loginid,"fullname":fullname,"email":email}

		$.ajax({
			type: 'PUT',
			url: uri,
			crossDomain : true,
			dataType : 'raw',
			contentType:"application/raw",  
			data : JSON.stringify(data),
 
		    	headers: {
				"X-Auth-Token":authToken.token,
				"Content-Type":usuariojson
			
		    	}
	    }).done(function(user){
			user.links = linksToMap(user.links);
			complete(user);
		})
		.fail(function(){});
}

function EliminarUsuario(complete){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    var uri = authToken["links"]["user-profile"].uri;
    console.log(authToken.token);
    $.ajax({
        type: 'DELETE',
        url: uri,
        headers: {
            "X-Auth-Token":authToken.token
        }
    }).done(function(data) { 
        sessionStorage.removeItem("api");
        sessionStorage.removeItem("auth-token");
        complete();
    }).fail(function(){});
}

/*        *
 *        *
 * STINGS *
 *        *
 *        */

function loadStings(uri, complete){
	// var authToken = JSON.parse(sessionStorage["auth-token"]);
	// var uri = authToken["links"]["current-stings"].uri;
	$.get(uri)
		.done(function(stings){
			stings.links = linksToMap(stings.links);
			complete(stings);
		})
		.fail(function(){});
}

function getSting(uri, complete){
	$.get(uri)
		.done(function(sting){
			complete(sting);
		})
		.fail(function(data){
		});
}


/*buscador*/
function buscador(e){
    var res = document.getElementById('buscar').value;
     if (e.keyCode === 13 && res == "")
        alert("para buscar escribe algo");
    if(e.keyCode === 13 && res != ""){
            alert("Enter was pressed was presses");
            var buscar = document.getElementById('buscar').value;
            console.log("res is :", buscar);
            $('#anuncio_result').text(''); 

//   console.log(a);
    //var authToken = JSON.parse(sessionStorage["auth-token"]);
    var uri = BASE_URI+"/anuncio";
    $.ajax({
        type : 'GET',
        url : uri,
        //headers: {"X-Auth-Token":authToken.token},
        dataType : 'json',
        crossDomain : true,
    }).done(function(data, status, jqxhr){
        
        var anuncios = data.stings;
       // var a = e.keyCode;
           


        // res = $'#anuncio_result'.val();
       // if (anuncios.userid == $('#anuncio_result').text() ) 
                //console.log("res :", res);
        $.each(anuncios, function(i, v) {
                                    var anuncio = v;

                                    console.log(anuncio);

                                   if (anuncio.subject == buscar )
                                   {
                                    $('<div class="list-group"><a href="#" id="'+i+'anuncio" class="list-group-item" data-toggle="modal" data-target="#VerAnuncio"><h4 class="list-group-item-heading">' + anuncio.subject +'</h4></a>').appendTo($('#anuncio_result'));
                                    $('<p class="list-group-item-text">').appendTo($('#anuncio_result'));
                                    $('<strong>Precio: </strong>' + anuncio.precio + ' € <br>').appendTo($('#anuncio_result'));
                                    if(anuncio.type=1){
                                        var tipo="artista";
                                    }
                                    else{
                                        var tipo="registrado";
                                    }
                                    $('<strong>Usuario: </strong>' + tipo + '<br>').appendTo($('#anuncio_result'));
                                    $('</p>').appendTo($('#anuncio_result'));
                                    $("#"+i+"anuncio").click(function(){
                                    //event.preventDefault();
                                    console.log("ID:" + anuncio.id);
                                    getAnuncio(BASE_URI+"/anuncio/"+anuncio.id, function(){
    
                                    });
                                    });
                                    }
        });
        //data.links=linksToMap(data.links);
        //var response = data;
        //var anuncioCollection = new AnuncioCollection(response);
        //var html = anuncioCollection.toHTML();
    }).fail(function(jqXHR, textStatus){
        $("#anuncio_result").text("");
        $("#anuncio_result").append("<div class='alert alert-block alert-danger'><p>Algo falló :(</p></div>");
    });
    
}   

        

        return false;
    }
   // console.log(e.keyCode);
    
/*          *
 * ANUNCIOS *
 *          */


/* OK */

function loadAnuncios(){
    $('#anuncio_result').text(''); 
    
    //var authToken = JSON.parse(sessionStorage["auth-token"]);
    var uri = BASE_URI+"/anuncio";
    $.ajax({
        type : 'GET',
        url : uri,
        //headers: {"X-Auth-Token":authToken.token},
        dataType : 'json',
        crossDomain : true,
    }).done(function(data, status, jqxhr){
        
        var anuncios = data.stings;
        $.each(anuncios, function(i, v) {
                                    var anuncio = v;
                                    console.log(i);
                                    $('<div class="list-group"><a href="#" id="'+i+'anuncio" class="list-group-item" data-toggle="modal" data-target="#VerAnuncio"><h4 class="list-group-item-heading">' + anuncio.subject +'</h4></a>').appendTo($('#anuncio_result'));
                                    $('<p class="list-group-item-text">').appendTo($('#anuncio_result'));
                                    $('<strong>Precio: </strong>' + anuncio.precio + ' € <br>').appendTo($('#anuncio_result'));
                                    if(anuncio.type=1){
                                        var tipo="artista";
                                    }
                                    else{
                                        var tipo="registrado";
                                    }
                                    $('<strong>Usuario: </strong>' + tipo + '<br>').appendTo($('#anuncio_result'));
                                    $('</p>').appendTo($('#anuncio_result'));
                                    $("#"+i+"anuncio").click(function(){
                                    //event.preventDefault();
                                    console.log("ID:" + anuncio.id);
                                    getAnuncio(BASE_URI+"/anuncio/"+anuncio.id, function(){
    
                                    });
                                    });
        });
        //data.links=linksToMap(data.links);
        //var response = data;
        //var anuncioCollection = new AnuncioCollection(response);
        //var html = anuncioCollection.toHTML();
    }).fail(function(jqXHR, textStatus){
        $("#anuncio_result").text("");
        $("#anuncio_result").append("<div class='alert alert-block alert-danger'><p>Algo falló :(</p></div>");
    });
    
}	

// previsualizar imagen 
function previewFile(){

       var preview = document.querySelector('img'); //selects the query named img
       var file    = document.querySelector('input[type=file]').files[0]; //sames as here
       var reader  = new FileReader();

       reader.onloadend = function () {
           preview.src = reader.result;
       }

       if (file) {
           reader.readAsDataURL(file);
           console.log(file) ; //reads the data as a URL
       } else {
           preview.src = "";
       }
}

function progressHandlingFunction(e){
    if(e.lengthComputable){
        $('progress').attr({value:e.loaded,max:e.total});
    }
}

function crearAnuncio(formdata){
   // var authToken = JSON.parse(sessionStorage["auth-token"]);
  //  var imgFile = document.getElementById('img');
  //  console.log(imgFile.src);
        var authToken = JSON.parse(sessionStorage["auth-token"]);
        var uri= BASE_URI + "/anuncio";
console.log(uri);
   /* var anuncio = new Object();
    anuncio.subject = subject;
    anuncio.description = description;
    anuncio.precio = precio;
    anuncio.type = type;
    console.log("tipo es <<>", type)
    anuncio.image = imgFile.src;*/
 
       $.ajax({
            url: uri,
            type: 'POST',
            xhr: function(){
                var myXhr=$.ajaxSettings.xhr();
                if(myXhr.upload){
                    myXhr.upload.addEventListener('progress',progressHandlingFunction,false);
                }
                return myXhr;
            },
            crossDomain: true,
            data: formdata,
            headers: {"X-Auth-Token":authToken.token},
            cache: false,
            contentType: false,
            processData: false
        }).done(function(data, status,jqxhr){
            var response = $.parseJSON(jqxhr.responseText);
            var lastfilename = response.filname;
            $('progress').toggle();
                                alert("Anuncio creado correctamente");

           // window.location.replace('music4.html');
            // data.links=linksToMap(data.links);
        window.location.reload();
        }).fail(function(jqXHR, textStatus) {
           var error = JSON.parse(jqXHR.responseText);
            $("#vacios2").text("");
            $("#vacios2").append('<div class="alert alert-block alert-info"><p><span style="color:red">'+error.reason+'</span></p></div>'); 
                    alert("No se ha creado el anuncio");

        });
        

}

function borrarAnuncio(id){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    $.ajax({
        url: BASE_URI+"/anuncio/"+id,
        type: 'DELETE',
        crossDomain: true,
        dataType: "json",
        headers: {"X-Auth-Token":authToken.token}
        
    }).done(function(data, status, jqxhr){
        //data.links=linksToMap(data.links);
        $('#' + id).hide();
    }).fail(function(){
        console.log('Error');
        alert("No se ha borrado el anuncio");

    });
}

var anuncio1;
function getAnuncio(uri){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    $.ajax({
        url: uri,
        type: 'GET',
        crossDomain: true,
        dataType: "json",
        headers: {"X-Auth-Token" : authToken.token}
    }).done(function(data, status, jqxhr){
        anuncio1 = data;
        $( "#anuncio_subject" ).replaceWith('<h2 id="anuncio_subject" class="modal-title" style="color:black">'+anuncio1.subject+'</h2>');
        if(anuncio1.type=1){
                var tipo="artista";
        }
        else{
                var tipo="registrado";
        }
        $("#anuncio").replaceWith(  '<p>'+ 
                                  '<img align="right" width="25%" src="' + UPLOADFOLDER + anuncio1.image + '.png"><br clear="left"/></img>' 
                                  + anuncio1.description + '</p><br>' + '<strong>Creator:</strong>' + anuncio1.creator 
                                  + '<br>' + '<strong>Precio</strong>' + anuncio1.price + ' €'
                                    + '<br>' + '<strong>Tipo de usuario</strong>' + tipo + '</p>'
                                 + '<p id="comment_result"></p>');
        loadComentarios(-1,anuncio1.id);
        //data.links=linksToMap(data.links);
    }).fail(function(){
        console.log("ERROR");
        $("#anuncio").text("");
        $("#anuncio").replaceWith("<div class='alert alert-block alert-danger'><p>Algo falló :(</p></div>" + '<p id="comment_result"></p>');
    });
}

function loadAnunciosbyUser(){    
    //var authToken = JSON.parse(sessionStorage["auth-token"]);
    var uri = BASE_URI+"/anuncio";
    $.ajax({
        type : 'GET',
        url : uri,
        //headers: {"X-Auth-Token":authToken.token},
        dataType : 'json',
        crossDomain : true,
    }).done(function(data, status, jqxhr){
        
        var anuncios = data.stings;
        $.each(anuncios, function(i, v) {
                                    var anuncio = v;
                                    console.log(i);
                                    if(userglobal.id==anuncio.userid){
                                    $('<div class="list-group" id="' + anuncio.id +'"><a href="#" id="'+i+'anuncio" class="list-group-item" data-toggle="modal" data-target="#VerAnuncio"><h4 class="list-group-item-heading">' + anuncio.subject +'</h4></a>').appendTo($('#anuncio_result'));
                                    $('<p class="list-group-item-text">').appendTo($('#anuncio_result'));
                                    $('<strong>Precio: </strong>' + anuncio.precio + ' € <br>').appendTo($('#anuncio_result'));
                                    if(anuncio.type=1){
                                        var tipo="artista";
                                    }
                                    else{
                                        var tipo="registrado";
                                    }
                                    $('<strong>Usuario: </strong>' + tipo + '<br>').appendTo($('#anuncio_result'));
                                    $('<img align="right" src="' + WEBSERVER + 'user-trash.png" onclick="borrarAnuncio(\'' + anuncio.id + '\');" style="cursor:pointer,vertical-align:bottom"></img>' +  '<img align="right" src="' + WEBSERVER + 'editar.png" onClick="editAnuncio(\'' + anuncio.id +'\')" style="cursor:pointer"></img></div>').appendTo($('#anuncio_result'));
                                    $('</p>').appendTo($('#anuncio_result'));
                                    }
                                    
                                    $("#"+i+"anuncio").click(function(){
                                    //event.preventDefault();
                                    console.log("ID:" + anuncio.id);
                                    getAnuncio(BASE_URI+"/anuncio/"+anuncio.id, function(){
                                    });
                                    });
        });
        //data.links=linksToMap(data.links);
        //var response = data;
        //var anuncioCollection = new AnuncioCollection(response);
        //var html = anuncioCollection.toHTML();
    }).fail(function(jqXHR, textStatus){
        $("#anuncio_result").text("");
        $("#anuncio_result").append("<div class='alert alert-block alert-danger'><p>Algo falló :(</p></div>");
    });
    
}


/*               *
 *               *
 *  MENSAJERÍA   *
 *               *
 *               */


function enviarMessage(loginid, destinatario,text, complete){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    console.log(authToken.token);
    var nuevoMensaje = new Object();
    nuevoMensaje.text=text;
    console.log(nuevoMessage);

    //var uri = JSON.parse(sessionStorage["uri-rooms2"]);
    console.log(uri);
    var uri= BASE_URI +'/message';

    $.ajax({
    type: 'POST',
    url: uri,
    crossDomain : true,
    dataType : 'json',
    data: nuevoMessage,
        contentType: "application/x-www-form-urlencoded", 
        headers: {
            "X-Auth-Token":authToken.token
        }
    
    }).done(function(text) { 
       // flat.links = linksToMap(flat.links);
        console.log(text);
        alert("Mensaje enviado correctamente" );
        complete();
    }).fail(function(jqXHR, textStatus, errorThrown){   
            var error = jqXHR.responseJSON;
                alert(error.reason);

    });
}


/*         *
 * EVENTOS *
 *         */

 function loadEvents(){
    $('#event_result').text(''); 
    
    //var authToken = JSON.parse(sessionStorage["auth-token"]);
    var uri = BASE_URI+"/events";
    $.ajax({
        type : 'GET',
        url : uri,
        //headers: {"X-Auth-Token":authToken.token},
        dataType : 'json',
        crossDomain : true,
    }).done(function(data, status, jqxhr){
        
        var events = data.events;
                
                $.each(events, function(i, v) {
					var evento = v;
                                        console.log(i);
                                        $('<div class="list-group"><a href="#" id="'+i+'event" class="list-group-item" data-toggle="modal" data-target="#VerEvento"><h4 class="list-group-item-heading">' + evento.titol +'</h4></a>').appendTo($('#event_result'));
                                        $('<p class="list-group-item-text">').appendTo($('#event_result'));
                                        $('<div>' + evento.text + '</div><br>').appendTo($('#event_result'));
                                        $('<strong>Fecha de inicio: </strong>' + evento.startDate + '<br>').appendTo($('#event_result'));
                                        $('</p>').appendTo($('#event_result'));
                                        $("#"+i+"event").click(function(){
                                        //event.preventDefault();
                                        console.log("ID:" + evento.id);
                                        getEvent(BASE_URI+"/events/"+evento.id); 
                                        });
				});
        
        
        
        
        //data.links=linksToMap(data.links);
        //var response = data;
        //var anuncioCollection = new AnuncioCollection(response);
        //var html = anuncioCollection.toHTML();
    }).fail(function(jqXHR, textStatus){
        $("#event_result").text("");
        $("#event_result").append("<div class='alert alert-block alert-danger'><p>Algo falló :(</p></div>");
    });
}

function getEvent(uri){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    $.ajax({
        url: uri,
        type: 'GET',
        crossDomain: true,
        dataType: "json",
        headers: {"X-Auth-Token" : authToken.token}
    }).done(function(data, status, jqxhr){
        var event1 = data;
        $( "#event_subject" ).replaceWith('<h2 id="event_subject" class="modal-title" style="color:black">'+event1.titol+'</h2>');
        $("#event").replaceWith('<div id="event">'+ event1.text + '<br>' + 
                                '<strong>Fecha de comienzo:</strong>' + event1.startDate + '<br>' + 
                                '<strong>Fecha de final</strong>' + event1.endDate + '</div>');
        
        loadComentarios(event1.id,-1);
        //data.links=linksToMap(data.links);
    }).fail(function(){
        console.log("ERROR");
        $("#event").text("");
        $("#event").replaceWith("<div class='alert alert-block alert-danger'><p>Algo falló :(</p></div>" + '<p id="comment_result"></p>');
    });
}

function crearEvent(titol, text, latitud, longitud, startdate, enddate){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    
    
    $.ajax({
        url: BASE_URI+"/events",
        type: 'POST',
        crossDomain: true,
        //dataType: "json",
        data: {     titol: titol,
                    text: text,
                    latitud: latitud,
                    longitud:longitud,
                    startdate:startdate,
                    enddate: enddate
        },
        headers: {"X-Auth-Token":authToken.token}
        
        }).done(function(data, status, jqxhr){
            
        data.links=linksToMap(data.links);
        //window.location.reload();
        
    }).fail(function(){
        console.log('Error');
    });
    
}

/*       *
 * FECHA *
 *       */

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

/*              *
 *  COMENTARIOS *
 *              */
 
/* OK */

 function crearComment(anuncioid, eventid, content){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    
    $.ajax({
        url: BASE_URI+"/comments",
        type: 'POST',
        crossDomain: true,
        //dataType: "json",
        data: {     anuncioid: anuncioid,
                    eventid: eventid,
                    content: content
        },
        headers: {"X-Auth-Token":authToken.token}
        
        }).done(function(data, status, jqxhr){
        data.links=linksToMap(data.links);
        var comentario = data;
        var date = new Date(comentario.creationTimestamp);
        var fecha = date.toLocaleDateString('es-ES', options);
        $('<div style="border-style:dotted" id="' + comentario.id +'"><br>' + comentario.content + ' por ' + comentario.creator + ' el ' + fecha +'<img align="right" src="' + WEBSERVER + 'user-trash.png" onclick="borrarComment(\'' + comentario.id + '\');" style="cursor:pointer;vertical-align:bottom;"></img>' +  '<img align="right" src="' + WEBSERVER + 'editar.png" onClick="editComment(\'' + comentario.id +'\')" style="cursor:pointer;vertical-align:bottom;"></img></div>').appendTo($('#comment_result'));       
    }).fail(function(){
        console.log('Error');
    });
    
}

function loadComentarios(eventid, anuncioid){
    $('#comments').text('');
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    if(eventid==-1){
    var uri = BASE_URI+"/comments?"+"anuncioid="+anuncioid;
    }
    else{
    var uri = BASE_URI+"/comments?"+"eventid="+eventid;
    }
    $.ajax({
        type : 'GET',
        url : uri,
        headers: {"X-Auth-Token":authToken.token},
        dataType : 'json',
        crossDomain : true,
    }).done(function(data, status, jqxhr){
        $('#comment_result').replaceWith('<div id="comment_result"><h5>Comentarios</h5></div>');
        var comentarios = data.comments;
        $.each(comentarios, function(i, v) {
                                    var comentario = v;
                                    var date = new Date(comentario.creationTimestamp);
                                    var fecha = date.toLocaleDateString('es-ES', options);
                                    if(comentario.userid==userglobal.id){
                                         $('<div style="border-style:dotted" id="' + comentario.id +'"><br>' + comentario.content + ' por ' + comentario.creator + ' el ' + fecha +'<img align="right" src="' + WEBSERVER + 'user-trash.png" onclick="borrarComment(\'' + comentario.id + '\');" style="cursor:pointer,vertical-align:bottom"></img>' +  '<img align="right" src="' + WEBSERVER + 'editar.png" onClick="editComment(\'' + comentario.id +'\')" style="cursor:pointer"></img></div>').appendTo($('#comment_result'));

                                    }
                                    else{
                                        $('<div id="' + comentario.id +'"><br>' + comentario.content + ' por ' + comentario.creator + ' el ' + fecha + '</div><br>').appendTo($('#comment_result'));
                                    
                                    }
                                    
        });
        //data.links=linksToMap(data.links);
    }).fail(function(jqXHR, textStatus){
        $("#comment_result").text("");
        $("#comment_result").replaceWith("<div class='alert alert-block alert-danger'><p>Algo falló :(</p></div>");
    });
}

/* OK */

function borrarComment(id){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    var uri=BASE_URI+"/comments/"+id;
    $.ajax({
        url: uri,
        type: 'DELETE',
        crossDomain: true,
        dataType: "json",
        //data: { content: contenido },
        headers: {"X-Auth-Token":authToken.token}
        
    }).done(function(data, status, jqxhr){
        //data.links=linksToMap(data.links);
        $('#' + id).hide(); 
    }).fail(function(){
        console.log('Error');
        window.alert('Falló el borrado de comentario');
    });
}

function editComment(id){
    window.alert("¡Implementa la edición Hixam!");
}

/*
 * PLAYLIST  *
 *           */

var song;

function loadPlaylist(){
    $('#playlist_result').text(''); 
    
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    var uri = BASE_URI+"/songs";
    $.ajax({
        type : 'GET',
        url : uri,
        headers: {"X-Auth-Token":authToken.token},
        dataType : 'json',
        crossDomain : true,
    }).done(function(data, status, jqxhr){
        
        var canciones = data.playlists;
        $.each(canciones, function(i, v) {
                                    song = v;
                                    console.log(i);
                                    if(userglobal.id==song.userid){
                                        if(song.youtubelink!=null){
                                            var link = song.youtubelink;
                                            var trozos = link.split('?v=');
                                            console.log(trozos[0], trozos[1]);
                                            
                                    $('<div id="' + song.id +'" class="list-group"><a href="#" id="'+i+'song" class="list-group-item" data-toggle="modal" data-target="#VerPlay"><h4 class="list-group-item-heading">' + song.artist + ' - ' + song.title + '</h4></a>' + '<p class="list-group-item-text">' + 
                                    '<br><audio src="'+ UPLOADFOLDER + song.audio + '" preload="auto" controls></audio><br><br>' + 
                                    '<iframe width="480" height="270" src="https://www.youtube.com/embed/' + trozos[1] +'" frameborder="0" allowfullscreen></iframe>' + 
                                    '<br><br><img align="right" src="' + WEBSERVER + 'user-trash.png" onclick="borrarPlay(\'' + song.id + '\');" style="cursor:pointer;vertical-align:bottom;"></img>' +  '<img align="right" src="' + WEBSERVER + 'editar.png" onClick="editPlay(\'' + song.id +'\')" style="cursor:pointer;vertical-align:bottom;"></img>' + '</p></div>').appendTo($('#playlist_result'));
                                        }
                                    else{
                                        $('<div id="' + song.id +'" class="list-group"><a href="#" id="'+i+'song" class="list-group-item" data-toggle="modal" data-target="#VerSong"><h4 class="list-group-item-heading">' + song.artist + ' - ' + song.title + '</h4></a>' + '<p class="list-group-item-text">' + 
                                    '<audio src="'+ UPLOADFOLDER + song.audio + '"></audio>' + 
                                    '<img align="right" src="' + WEBSERVER + 'user-trash.png" onclick="borrarPlay(\'' + song.id + '\');" style="cursor:pointer;vertical-align:bottom;"></img>' +  '<img align="right" src="' + WEBSERVER + 'editar.png" onClick="editPlay(\'' + song.id +'\')" style="cursor:pointer;vertical-align:bottom;"></img>' + '</p></div>').appendTo($('#playlist_result'));
                                    }
                                    $("#"+i+"song").click(function(){
                                    //event.preventDefault();
                                    console.log("ID:" + song.id);
                                    getSong(BASE_URI+"/songs/"+song.id, function(){
                                    
                                    });
                                    });
                                    }
        });
        //data.links=linksToMap(data.links);
        //var response = data;
        //var anuncioCollection = new AnuncioCollection(response);
        //var html = anuncioCollection.toHTML();
    }).fail(function(jqXHR, textStatus){
        $("#playlist_result").text("");
        $("#playlist_result").append("<div class='alert alert-block alert-danger'><p>Algo falló :(</p></div>");
    });
}

function crearPlay(formdata){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
  //  var imgFile = document.getElementById('img');
  //  console.log(imgFile.src);
    var uri= BASE_URI + "/songs";
 
       $.ajax({
            url: uri,
            type: 'POST',
            xhr: function(){
                var myXhr=$.ajaxSettings.xhr();
                if(myXhr.upload){
                    myXhr.upload.addEventListener('progress',progressHandlingFunction,false);
                }
                return myXhr;
            },
            crossDomain: true,
            data: formdata,
            headers: {"X-Auth-Token":authToken.token},
            cache: false,
            contentType: false,
            processData: false
        }).done(function(data, status,jqxhr){
            var response = $.parseJSON(jqxhr.responseText);
            var lastfilename = response.filname;
            $('progress').toggle();
           // window.location.replace('music4.html');
            // data.links=linksToMap(data.links);
            window.location.reload();
        }).fail(function(jqXHR, textStatus) {
           var error = JSON.parse(jqXHR.responseText);
            $("#vacios2").text("");
            $("#vacios2").append('<div class="alert alert-block alert-info"><p><span style="color:red">'+error.reason+'</span></p></div>'); 
                    alert("No se ha creado el anuncio");

        });
        

}

function borrarPlay(id){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    var uri=BASE_URI+"/songs/"+id;
    $.ajax({
        url: uri,
        type: 'DELETE',
        crossDomain: true,
        dataType: "json",
        //data: { content: contenido },
        headers: {"X-Auth-Token":authToken.token}
        
    }).done(function(data, status, jqxhr){
        //data.links=linksToMap(data.links);
        $('#' + id).hide();
    }).fail(function(){
        console.log('Error');
        window.alert('Falló el borrado de la canción');
    });
}

function editPlay(id){
    window.alert("¡Implementa la edición Hixam!");
}

function getSong(uri){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    $.ajax({
        url: uri,
        type: 'GET',
        crossDomain: true,
        dataType: "json",
        headers: {"X-Auth-Token" : authToken.token}
    }).done(function(data, status, jqxhr){
        var song1 = data;
        $( "#anuncio_subject" ).replaceWith('<h2 id="anuncio_subject" class="modal-title" style="color:black">'+ song1.artist + ' - ' + song1.title +'</h2>');
        $("#song").replaceWith('<strong>Artista:</strong>' + song1.artist 
                                  + '<br>' + '<strong>Título</strong>' + song1.title + ' €'
                                 + '<p id="api_externa"></p>');
        loadDatosCancion(song1.artist, song1.title);
        //data.links=linksToMap(data.links);
    }).fail(function(){
        console.log("ERROR");
        $("#song").text("");
        $("#song").replaceWith("<div class='alert alert-block alert-danger'><p>Algo falló :(</p></div>" + '<p id="api_externa"></p>');
    });
}

var DISCOGS="https://api.discogs.com"


function listItemHTML(imageURL){
var imageURL = '<img  style="width:300px;height:228px" src="'+ imageURL +'">';
//var filename = '<img  style=width:300px;height:228px; src= http://147.83.7.207:88/img/'+ filename +'>';;

  console.log("imgurl", imageURL);

  return imageURL;
}
