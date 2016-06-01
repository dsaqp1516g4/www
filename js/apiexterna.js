var DISCOGS = "https://api.discogs.com/"

// https://www.discogs.com/developers/#page:database,header:database-search

/* Respuesta ejemplo:
 * 
      {
    "pagination": {
        "per_page": 3,
        "pages": 66,
        "page": 1,
        "urls": {
        "last": "http://api.discogs.com/database/search?per_page=3&artist=nirvana&release_title=nevermind&page=66",
        "next": "http://api.discogs.com/database/search?per_page=3&artist=nirvana&release_title=nevermind&page=2"
        },
        "items": 198
    },
    "results": [
        {
        "style": [
            "Interview",
            "Grunge"
        ],
        "thumb": "",
        "title": "Nirvana - Nevermind",
        "country": "Australia",
        "format": [
            "DVD",
            "PAL"
        ],
        "uri": "/Nirvana-Nevermind-Classic-Albums/release/2028757",
        "community": {
            "want": 1,
            "have": 5
        },
        "label": [
            "Eagle Vision",
            "Rajon Vision",
            "Classic Albums"
        ],
        "catno": "RV0296",
        "year": "2005",
        "genre": [
            "Non-Music",
            "Rock"
        ],
        "resource_url": "http://api.discogs.com/releases/2028757",
        "type": "release",
        "id": 2028757
        },
        {
        "style": [
            "Interview",
            "Grunge"
        ],
        "thumb": "",
        "title": "Nirvana - Nevermind",
        "country": "France",
        "format": [
            "DVD",
            "PAL"
        ],
        "uri": "/Nirvana-Nevermind-Classic-Albums/release/1852962",
        "community": {
            "want": 4,
            "have": 21
        },
        "label": [
            "Eagle Vision",
            "Classic Albums"
        ],
        "catno": "EV 426200",
        "year": "2005",
        "genre": [
            "Non-Music",
            "Rock"
        ],
        "resource_url": "http://api.discogs.com/releases/1852962",
        "type": "release",
        "id": 1852962
        },
        {
        "style": [
            "Hard Rock",
            "Classic Rock"
        ],
        "thumb": "",
        "format": [
            "UMD"
        ],
        "country": "Europe",
        "barcode": [
            "5 034504 843646"
        ],
        "uri": "/Nirvana-Nevermind/release/3058947",
        "community": {
            "want": 10,
            "have": 3
        },
        "label": [
            "Eagle Vision"
        ],
        "catno": "ERUMD436",
        "genre": [
            "Rock"
        ],
        "title": "Nirvana - Nevermind",
        "resource_url": "http://api.discogs.com/releases/3058947",
        "type": "release",
        "id": 3058947
        }
    ]
    }

*/

function loadDatosCancion(artista, titulo){
    $('#api_externa').replaceWith('<div id="api_externa"></div>'); 
    
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    var uri = DISCOGS + '/database/search?q=&' + 'type=release&title=' + artista + ' - ' + titulo;
    
    var API = "https://api.discogs.com/database/search"
    dataString = 'q=&' + 'type=release&title=' + artista + ' - ' + titulo;

    $.getJSON(API, dataString, function(json){
        //$("#more").after(html);
        alert("Success!");
        alert(JSON.stringify(json));
    });
    
    
    /*$.ajax({
        type : 'GET',
        url : uri,
        headers: {"User-Agent":'Music4you/0.1'},
        //dataType : 'json',
        crossDomain : true,
    }).done(function(data, status, jqxhr){
        var cancion = data.results;
        
        $('<div><strong>Género:</strong>'+ cancion[0].genre).appendTo($('#api_externa'));
        
        }).fail(function(jqXHR, textStatus){
        $("#api_externa").text("");
        $("#api_externa").append("<div class='alert alert-block alert-danger'><p>Algo falló :(</p></div>");
    });
    */
}
