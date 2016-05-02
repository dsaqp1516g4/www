function loadPlaylist(uri){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    $.ajax({
        url: uri,
        type: 'GET',
        crossDomain: true,
        dataType: "json",
        headers: {"X-Auth-Token" : authToken.token}
    }).done(function(data, status, jqxhr){
        data.links=linksToMap(data.links);
        var playlist = data.playlist;
           $('#listacomprar').text("");
        $.each(listas, function(i,v){
            if(v.hecho==false){
            $('#listacomprar').append('<li><div><p class="news-item-preview">'+v.item+'</p></div></li>');
            }
        });
    }).fail(function(jqXHR, textStatus) {
        var error = JSON.parse(jqXHR.responseText);
        console.log(error.reason);
    });
}