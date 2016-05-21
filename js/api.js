var BASE_URI = "http://localhost:8080/music4you"
var WEBSERVER = "./img/"


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

function getCurrentUserProfile(complete){
	var authToken = JSON.parse(sessionStorage["auth-token"]);
	var uri = authToken["links"]["user-profile"].uri;
	$.get(uri)
		.done(function(user){
			user.links = linksToMap(user.links);
			complete(user);
		})
		.fail(function(){});
}

/*       *
 *       *
 * LOGIN *
 *       *
 *       */

function login(loginid, password, complete){
    console.log("function login: "+loginid+" amb password: " +password+" complete: "+complete)
	loadAPI(function(){
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
                                    $('<strong>Userid: </strong>' + anuncio.userid + '<br>').appendTo($('#anuncio_result'));
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

function crearAnuncio(subject, description, precio, type, uri){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    
    var anuncio = new Object();
    anuncio.subject = subject;
    anuncio.description = description;
    anuncio.precio = precio;
    anuncio.type = type;
    
    $.ajax({
        url: uri,
        type: 'POST',
        crossDomain: true,
        dataType: "json",
        data: { content: anuncio
        },
        headers: {"X-Auth-Token":authToken.token}
        
        }).done(function(data, status, jqxhr){
        data.links=linksToMap(data.links);
        window.location.reload();
    }).fail(function(){
        console.log('Error');
    });
}

function borrarAnuncio(contenido, uri){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    $.ajax({
        url: uri,
        type: 'DELETE',
        crossDomain: true,
        dataType: "json",
        data: { content: contenido },
        headers: {"X-Auth-Token":authToken.token}
        
    }).done(function(data, status, jqxhr){
        data.links=linksToMap(data.links);
        window.location.reload();
    }).fail(function(){
        console.log('Error');
    });
}

function getAnuncio(uri){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    $.ajax({
        url: uri,
        type: 'GET',
        crossDomain: true,
        dataType: "json",
        headers: {"X-Auth-Token" : authToken.token}
    }).done(function(data, status, jqxhr){
        var anuncio1 = data;
        $( "#anuncio_subject" ).replaceWith('<h2 id="anuncio_subject" class="modal-title" style="color:black">'+anuncio1.subject+'</h2>');
        if(anuncio1.type=1){
                var tipo="artista";
        }
        else{
                var tipo="registrado";
        }
        $("#anuncio").replaceWith(  '<p>'+ 
                                  '<img align="right" src="' + WEBSERVER + anuncio1.image + '.png"><br clear="left"/></img>' 
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
                                        $('<div class="list-group"><a href="#" class="list-group-item"><h4 class="list-group-item-heading">' + evento.titol +'</h4></a>').appendTo($('#event_result'));
                                        $('<p class="list-group-item-text">').appendTo($('#event_result'));
                                        $('<div>' + evento.text + '</div><br>').appendTo($('#event_result'));
                                        $('<strong>Fecha de inicio: </strong>' + evento.startDate + '<br>').appendTo($('#event_result'));
                                        $('</p>').appendTo($('#event_result'));
                                        $('<a href="#" id="'+i+'event" class="list-group-item" data-toggle="modal" data-target="#VerEvento">Más...</a>').appendTo($('#event_result'));
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



/*
 * USUARIOS *
 *          */


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



/*              *
 *  COMENTARIOS *
 *              */
 
 function crearComent(userid, eventid, content, uri){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    
    var comentario = new Object();
    comentario.userid = userid;
    comentario.eventid = eventid;
    comentario.content = content;
    
    
    $.ajax({
        url: uri,
        type: 'POST',
        crossDomain: true,
        dataType: "json",
        data: { content: comments
        },
        headers: {"X-Auth-Token":authToken.token}
        
        }).done(function(data, status, jqxhr){
        data.links=linksToMap(data.links);
        window.location.reload();
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
        
        var comentarios = data.comments;
        $.each(comentarios, function(i, v) {
                                    var comentario = v;
                                    console.log(comentario.content);
                                    $('#comentario_result').replaceWith('<div id="comment_result"><h5>Comentarios</h5>' + comentario.content + ' por ' + comentario.creator+ ' el ' + comentario.fecha + '<img src="./img/user-trash.png" onclick="borrarComment(' + comentario.id + ');" style="cursor:pointer"></img>' +  '<img src="editar.png" onClick="editComment(' + comentario.id +')"></img></div>');
                                    
                                    //$('<div class="list-group"><a href="#" id="'+i+'anuncio" class="list-group-item" data-toggle="modal" data-target="#VerAnuncio"><h4 class="list-group-item-heading">' + anuncio.subject +'</h4></a>').appendTo($('#anuncio_result'));
                                    //$('<p class="list-group-item-text">').appendTo($('#anuncio_result'));
                                    //$('<strong>Userid: </strong>' + anuncio.userid + '<br>').appendTo($('#anuncio_result'));
                                    //$('<strong>Precio: </strong>' + anuncio.precio + ' € <br>').appendTo($('#anuncio_result'));

                                    //$('</p>').appendTo($('#anuncio_result'));
                                    //$("#"+i+"anuncio").click(function(){
                                    //event.preventDefault();
                                    //console.log("ID:" + anuncio.id);
                                    //getAnuncio(BASE_URI+"/anuncio/"+anuncio.id, function(){
    
                                    //});
        });
        //data.links=linksToMap(data.links);
    }).fail(function(jqXHR, textStatus){
        $("#comment_result").text("");
        $("#comment_result").replaceWith("<div class='alert alert-block alert-danger'><p>Algo falló :(</p></div>");
    });
}

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
        //window.location.reload();
    }).fail(function(){
        console.log('Error');
    });
}

/*
 * PLAYLIST  *
 *           */

function loadPlaylist(){
    $('#coment_result').text(''); 
    
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
                                    $('<strong>Userid: </strong>' + anuncio.userid + '<br>').appendTo($('#anuncio_result'));
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
}*/
