var BASE_URI = "http://localhost:8080/music4you"

$(function(){
    loadAnuncios();
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
                                //window.location.replace("music4you.html");
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


/*          *
 * ANUNCIOS *
 *          */

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
                                        $('<div class="list-group"><a href="#" class="list-group-item active"><h4 class="list-group-item-heading">' + anuncio.subject +'</h4><br>').appendTo($('#anuncio_result'));
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
                                        $('</p></a>').appendTo($('#anuncio_result'));
                                        
                                        /* $.each(files, function(j, w) {
                                            var file = w;
                                            $('<div class="list-group"><a href="#" class="list-group-item active"><h4 class="list-group-item-heading">' + file.subject +'</h4><br>').appendTo($('#anuncio_result'));
                                            $('<p class="list-group-item-text">').appendTo($('#anuncio_result'));
                                            $('<strong>Preu: </strong>' + file.basePrice + ' € <br>').appendTo($('#anuncio_result'));
                                            
                                            var date = new Date(file.creationDate);
                                            var hours = date.getHours();
                                            var minutes = date.getMinutes();
                                            var seconds = date.getSeconds();
                                            var day = date.getDate();
                                            var month = date.getMonth() + 1;
                                            var year = date.getFullYear();
                                            // $('<strong> Creation Date: </strong> ' + file.creationdate + '<br>').appendTo($('#result'));
                                            $('<strong> Creation Date: </strong> ' + day+'/'+month+'/'+year+' '+hours+':'+minutes+':'+seconds + '<br>').appendTo($('#anuncio_result'));
                                            $('<strong> Cilindrada: </strong> ' + file.cm3 + '<br>').appendTo($('#anuncio_result'));
                                            $('<strong> Maker: </strong> ' + file.maker + '<br>').appendTo($('#anuncio_result'));
                                            $('<strong> Velocitat màxima: </strong> ' + file.maximumSpeed + 'km/h<br>').appendTo($('#anuncio_result'));
                                            $('<strong> Model: </strong> ' + file.model + '<br>').appendTo($('#anuncio_result'));
                                            $('<strong> Subversions: </strong> ' + file.subversions + '<br></p></a>').appendTo($('#anuncio_result'));
                                            //$.each(files.subversion, function(h, y) {
                                            //    var version = y;
                                            //    $('<strong> Subversión 1: </strong> ' + version.model + '<br>').appendTo($('#result'));
                                        }); */
				});
        
        
        
        
        //data.links=linksToMap(data.links);
        //var response = data;
        //var anuncioCollection = new AnuncioCollection(response);
        //var html = anuncioCollection.toHTML();
    }).fail(function(jqXHR, textStatus){
        $("#anuncio_result").text("");
        $("#anuncio_result").append("<div class='alert alert-block alert-info'><p>You have to be login for see this page.</p></div>");
    });
}

function crearAnuncio(contenido, uri){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    $.ajax({
        url: uri,
        type: 'POST',
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
        data.links=linksToMap(data.links);
    }).fail(function(){
        console.log("ERROR");
    });
}

/*
 * USUARIOS *
 *          */


function registrarUsuario (loginid, password, fullname, email, complete){
    loadAPI(function(){
        var api = JSON.parse(sessionStorage.api);
        var uri= "http://0.0.0.0:8080/music4you/users";;
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
 
