var DISCOGS = "https://api.discogs.com/database/search"

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

var clave2="U2FsdGVkX1/PmA/ezdHmG6Su3UOAP4b54QrMmvkgptA=";
var contrasenya2="U2FsdGVkX1/fOoam2GHwF2rangg4skwYBY0UgVe1xIE=";
var d = new Date();
var fecha = d.toDateString();

var clave="1";
var contrasenya="2";

//var clave = CryptoJS.AES.decrypt(clave2, fecha);
//var contrasenya= CryptoJS.AES.decrypt(contrasenya2, fecha).toString();

function loadDatosCancion(artista, titulo){
    $('#api_externa').replaceWith('<div id="api_externa"></div>'); 
    
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    
    $.ajax({
        type : 'GET',
        url : DISCOGS,
        //headers: {"User-Agent":'Music4you/0.1 +http://80.103.156.84/'},
        data: { 
                artist: artista,
                release_title: titulo,
                type: 'release',
                key: clave,
                secret: contrasenya
        },
        dataType : 'json',
        crossDomain : true,
        //jsonp: 'callback',
    }).done(function(data, status, jqxhr){
        var results = data.results;
        if(data.results != ""){
        var cancion = results[0];
        if(cancion.label[1]==null){
                                $("#api_externa").replaceWith('<p id="api_externa">' + '<img src="' + cancion.thumb + '" alt="Portada del disco"></img><br>' 
                                    + '<strong>Género: </strong>' + cancion.genre
                                  + '<br>' + '<strong>Estilos: </strong>' + cancion.style
                                  + '<br>' + '<strong>Año: </strong>' + cancion.year
                                  + '<br>' + '<strong>Discográfica: </strong>'
                                  + '<ul><li>' + cancion.label[0] + '</li></ul>' + '</p>');
        }
        if(cancion.label[2]==null){
                                    $("#api_externa").replaceWith('<p id="api_externa">' + '<img src="' + cancion.thumb + '" alt="Portada del disco"></img><br>' 
                                    + '<strong>Género: </strong>' + cancion.genre
                                  + '<br>' + '<strong>Estilos: </strong>' + cancion.style
                                  + '<br>' + '<strong>Año: </strong>' + cancion.year
                                  + '<br>' + '<strong>Discográfica: </strong>'
                                  + '<ul><li>' + cancion.label[0] + '</li>'
                                  + '<li>' + cancion.label[1] + '</li></ul>' + '</p>');
        }
        if(cancion.label[3]==null){
                                    $("#api_externa").replaceWith('<p id="api_externa">' + '<img src="' + cancion.thumb + '" alt="Portada del disco"></img><br>' 
                                    + '<strong>Género: </strong>' + cancion.genre
                                  + '<br>' + '<strong>Estilos: </strong>' + cancion.style
                                  + '<br>' + '<strong>Año: </strong>' + cancion.year
                                  + '<br>' + '<strong>Discográfica: </strong>'
                                  + '<ul><li>' + cancion.label[0] + '</li>'
                                  + '<li>' + cancion.label[1] + '</li>'
                                  + '<li>' + cancion.label[2] + '</li></ul>' + '</p>');
        }
        else{ 
                                $("#api_externa").replaceWith('<p id="api_externa">' + '<img src="' + cancion.thumb + '" alt="Portada del disco"></img><br>' 
                                    + '<strong>Género: </strong>' + cancion.genre
                                  + '<br>' + '<strong>Estilos: </strong>' + cancion.style
                                  + '<br>' + '<strong>Año: </strong>' + cancion.year + '</p>');
        }
        }
        }).fail(function(jqXHR, textStatus){
        $("#api_externa").text("");
        $("#api_externa").append("<div class='alert alert-block alert-danger'><p>Algo falló :(</p></div>");
    });
    
}
