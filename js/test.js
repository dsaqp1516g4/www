/*              *
 *  COMENTARIOS *
 *              */



function crearComment(content, eventid, uri){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    
    var comentario = new Object();
    comentario.eventid = eventid;
    //comentario.anuncioid = anuncioid;
    comentario.content=content;
    
    $.ajax({
        url: uri,
        type: 'POST',
        crossDomain: true,
        dataType: "json",
        data: { content: comentario },
        headers: {"X-Auth-Token":authToken.token}
        
        }).done(function(data, status, jqxhr){
        data.links=linksToMap(data.links);
        window.location.reload();
    }).fail(function(){
        console.log('Error');
    });
}

function borrarComment(contenido, uri){
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

function getComment(uri){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    $.ajax({
        url: uri,
        type: 'GET',
        crossDomain: true,
        dataType: "json",
        headers: {"X-Auth-Token" : authToken.token}
    }).done(function(data, status, jqxhr){
        var comentario = data.stings;
        
            $('<p><strong>Userid: </strong>' + comentario.userid + '<br>').appendTo($('#comentario_result'));
            $('<strong>Contenido: </strong>' + comentario.contenido + ' € <br>').appendTo($('#comentario_result'));

            $('</p>').appendTo($('#comment_result'));
        
        
        data.links=linksToMap(data.links);
    }).fail(function(){
        console.log("ERROR");
    });
}

function editComment(uri){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    
    var authToken = JSON.parse(sessionStorage["auth-token"]);
	
	console.log(authToken.token);
	var id = JSON.parse(sessionStorage["commentid"]);
	var uri = JSON.parse(sessionStorage["uri-comment"]);
	var userid= authToken.userid;
	console.log(uri);
        
    /* var todo = {
        id,
        uri,
        userid,
        contenido,
        eventid,
        anuncioid
    }
    
    
    
    var data=
    {
    "id": "ED311DC4185011E6B87EA41731CD71C1",
    "userid": "37D93955042B11E6AC22A41731CD71C1",
    "eventid": "01000000000000000000000000000000",
    "content": "es muy bueno",
    "lastModified": 1463064653000,
    "creationTimestamp": 1463064653000} */
    
    
    $.ajax({
        url: uri,
        type: 'PUT',
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
 * PLAYLIST  *
 *           */

function crearComment(content, eventid, uri){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    
    var comentario = new Object();
    comentario.eventid = eventid;
    //comentario.anuncioid = anuncioid;
    comentario.content=content;
    
    $.ajax({
        url: uri,
        type: 'POST',
        crossDomain: true,
        dataType: "json",
        data: { content: comentario },
        headers: {"X-Auth-Token":authToken.token}
        
        }).done(function(data, status, jqxhr){
        data.links=linksToMap(data.links);
        window.location.reload();
    }).fail(function(){
        console.log('Error');
    });
}

function borrarComment(contenido, uri){
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

function getComment(uri){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    $.ajax({
        url: uri,
        type: 'GET',
        crossDomain: true,
        dataType: "json",
        headers: {"X-Auth-Token" : authToken.token}
    }).done(function(data, status, jqxhr){
        var comentario = data.stings;
        
            $('<p><strong>Userid: </strong>' + comentario.userid + '<br>').appendTo($('#comentario_result'));
            $('<strong>Contenido: </strong>' + comentario.contenido + ' € <br>').appendTo($('#comentario_result'));

            $('</p>').appendTo($('#comment_result'));
        
        
        data.links=linksToMap(data.links);
    }).fail(function(){
        console.log("ERROR");
    });
}

function editComment(uri){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    
    var authToken = JSON.parse(sessionStorage["auth-token"]);
	
	console.log(authToken.token);
	var id = JSON.parse(sessionStorage["commentid"]);
	var uri = JSON.parse(sessionStorage["uri-comment"]);
	var userid= authToken.userid;
	console.log(uri);
        
    /* var todo = {
        id,
        uri,
        userid,
        contenido,
        eventid,
        anuncioid
    }
    
    
    
    var data=
    {
    "id": "ED311DC4185011E6B87EA41731CD71C1",
    "userid": "37D93955042B11E6AC22A41731CD71C1",
    "eventid": "01000000000000000000000000000000",
    "content": "es muy bueno",
    "lastModified": 1463064653000,
    "creationTimestamp": 1463064653000} */
    
    
    $.ajax({
        url: uri,
        type: 'PUT',
        crossDomain: true,
        dataType: "json",
        headers: {"X-Auth-Token" : authToken.token}
    }).done(function(data, status, jqxhr){
        data.links=linksToMap(data.links);
    }).fail(function(){
        console.log("ERROR");
    });
}

/*          *
 * EVENT    *
 *          */

function crearComment(content, eventid, uri){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    
    var comentario = new Object();
    comentario.eventid = eventid;
    //comentario.anuncioid = anuncioid;
    comentario.content=content;
    
    $.ajax({
        url: uri,
        type: 'POST',
        crossDomain: true,
        dataType: "json",
        data: { content: comentario },
        headers: {"X-Auth-Token":authToken.token}
        
        }).done(function(data, status, jqxhr){
        data.links=linksToMap(data.links);
        window.location.reload();
    }).fail(function(){
        console.log('Error');
    });
}

function borrarComment(contenido, uri){
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

function getComment(uri){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    $.ajax({
        url: uri,
        type: 'GET',
        crossDomain: true,
        dataType: "json",
        headers: {"X-Auth-Token" : authToken.token}
    }).done(function(data, status, jqxhr){
        var comentario = data.stings;
        
            $('<p><strong>Userid: </strong>' + comentario.userid + '<br>').appendTo($('#comentario_result'));
            $('<strong>Contenido: </strong>' + comentario.contenido + ' € <br>').appendTo($('#comentario_result'));

            $('</p>').appendTo($('#comment_result'));
        
        
        data.links=linksToMap(data.links);
    }).fail(function(){
        console.log("ERROR");
    });
}

function editComment(uri){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    
    var authToken = JSON.parse(sessionStorage["auth-token"]);
	
	console.log(authToken.token);
	var id = JSON.parse(sessionStorage["commentid"]);
	var uri = JSON.parse(sessionStorage["uri-comment"]);
	var userid= authToken.userid;
	console.log(uri);
        
    /* var todo = {
        id,
        uri,
        userid,
        contenido,
        eventid,
        anuncioid
    }
    
    
    
    var data=
    {
    "id": "ED311DC4185011E6B87EA41731CD71C1",
    "userid": "37D93955042B11E6AC22A41731CD71C1",
    "eventid": "01000000000000000000000000000000",
    "content": "es muy bueno",
    "lastModified": 1463064653000,
    "creationTimestamp": 1463064653000} */
    
    
    $.ajax({
        url: uri,
        type: 'PUT',
        crossDomain: true,
        dataType: "json",
        headers: {"X-Auth-Token" : authToken.token}
    }).done(function(data, status, jqxhr){
        data.links=linksToMap(data.links);
    }).fail(function(){
        console.log("ERROR");
    });
}

/* MENSAJERÍA */

function crearComment(content, eventid, uri){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    
    var comentario = new Object();
    comentario.eventid = eventid;
    //comentario.anuncioid = anuncioid;
    comentario.content=content;
    
    $.ajax({
        url: uri,
        type: 'POST',
        crossDomain: true,
        dataType: "json",
        data: { content: comentario },
        headers: {"X-Auth-Token":authToken.token}
        
        }).done(function(data, status, jqxhr){
        data.links=linksToMap(data.links);
        window.location.reload();
    }).fail(function(){
        console.log('Error');
    });
}

function borrarComment(contenido, uri){
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

function getComment(uri){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    $.ajax({
        url: uri,
        type: 'GET',
        crossDomain: true,
        dataType: "json",
        headers: {"X-Auth-Token" : authToken.token}
    }).done(function(data, status, jqxhr){
        var comentario = data.stings;
        
            $('<p><strong>Userid: </strong>' + comentario.userid + '<br>').appendTo($('#comentario_result'));
            $('<strong>Contenido: </strong>' + comentario.contenido + ' € <br>').appendTo($('#comentario_result'));

            $('</p>').appendTo($('#comment_result'));
        
        
        data.links=linksToMap(data.links);
    }).fail(function(){
        console.log("ERROR");
    });
}

function editComment(uri){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    
    var authToken = JSON.parse(sessionStorage["auth-token"]);
	
	console.log(authToken.token);
	var id = JSON.parse(sessionStorage["commentid"]);
	var uri = JSON.parse(sessionStorage["uri-comment"]);
	var userid= authToken.userid;
	console.log(uri);
        
    /* var todo = {
        id,
        uri,
        userid,
        contenido,
        eventid,
        anuncioid
    }
    
    
    
    var data=
    {
    "id": "ED311DC4185011E6B87EA41731CD71C1",
    "userid": "37D93955042B11E6AC22A41731CD71C1",
    "eventid": "01000000000000000000000000000000",
    "content": "es muy bueno",
    "lastModified": 1463064653000,
    "creationTimestamp": 1463064653000} */
    
    
    $.ajax({
        url: uri,
        type: 'PUT',
        crossDomain: true,
        dataType: "json",
        headers: {"X-Auth-Token" : authToken.token}
    }).done(function(data, status, jqxhr){
        data.links=linksToMap(data.links);
    }).fail(function(){
        console.log("ERROR");
    });
}