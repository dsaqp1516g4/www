var BASE_URI = "http://localhost:8080/music4you"

function loadAnuncios(uri){
    $('#message').text(''); 
    $('#pagination').text('');
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    $.ajax({
        type : 'GET',
        url : uri,
        headers: {"X-Auth-Token":authToken.token}
    }).done(function(data, status, jqxhr){
        data.links=linksToMap(data.links);
        var response = data;
        var anuncioCollection = new AnuncioCollection(response);
        var html = anuncioCollection.toHTML();
    }).fail(function(jqXHR, textStatus){
        $("#anuncios").text("");
        $("#anuncios").append("<div class='alert alert-block alert-info'><p>You have to be login for see this page.</p></div>");
    });
}

function AnuncioCollection (anuncioCollection){ 
  this.Anuncio = anuncioCollection;
    var instance = this;
    
    this.toHTML = function(){
        var html = '';
        $.each(this.Anuncio, function(i,v){
            var anuncio = v;
        $.each(anuncio, function(i,v){
            if(v.content != undefined)
             $("#message").append('<li><div><a href="#" onClick="getProfile(\''+v.links[5].uri+'\');" class="news-item-title">'+v.loginid+'</a><p class="news-item-preview">'+v.content+'</p></div></li>');
    
        });
    });
        console.log(anuncioCollection);
        var prev = this.Anuncio.links["prev"].uri;
           var next = this.Anuncio.links["next"].uri;
        if(anuncioCollection.pagbefore==0){
            $('#pagination').append(' <a onClick="loadStings(\'' + next + '\');" style = "cursor: pointer; cursor: hand;"><div class="span3"><button class="btn btn-box">Next</button></div></a>');
        }
        else if (anuncioCollection.pagbefore==anuncioCollection.pagtotal){
             $('#pagination').append(' <a onClick="loadStings(\'' + prev + '\');" style = "cursor: pointer; cursor: hand; "><div class="span3"><button class="btn btn-box">Previous</button></div></a>');
        }
        else{
        if(prev){
            $('#pagination').append(' <a onClick="loadStings(\'' + prev + '\');" style = "cursor: pointer; cursor: hand; "><div class="span3"><button class="btn btn-box">Previous</button></div></a>');
        }
        if(next){
           $('#pagination').append(' <a onClick="loadStings(\'' + next + '\');" style = "cursor: pointer; cursor: hand; "><div class="span3"><button class="btn btn-box">Next</button></div></a>');
        }
        }
        return html;
    }
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


