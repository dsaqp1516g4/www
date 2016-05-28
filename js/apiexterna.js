var DISCOGS="https://api.discogs.com"




function loadDatosCancion(){
    $('#playlist_result').text(''); 
    
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    var uri = DISCOGS+"/database/search?q=&" + "type=release&title=" + song.artist " - " + song.title;
    $.ajax({
        type : 'GET',
        url : uri,
        //headers: {"X-Auth-Token":authToken.token},
        dataType : 'json',
        crossDomain : true,
    }).done(function(data, status, jqxhr){
        
        
        }).fail(function(jqXHR, textStatus){
        $("#playlist_result").text("");
        $("#playlist_result").append("<div class='alert alert-block alert-danger'><p>Algo falló :(</p></div>");
    });
}