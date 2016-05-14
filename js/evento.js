var BASE_URI = "http://localhost:8080/music4you"


$(function(){
    //var authToken = JSON.parse(sessionStorage["auth-token"]);
    //var currentAnunciosUri = authToken["links"]["current-anuncios"].uri;
    
    
    loadEventos();

    //loadAnuncios(currentStingsUri, function(stings){
    //    $("#anuncio_result").empty();
        //processStingCollection(stings);
   });

$( "#form-evento" ).submit(function( event ) {
    event.preventDefault();
    crearEvento($("#inputSubject").val(), $("#inputDescription").val(), $("#inputPrice").val(), $("#inputType").val(), function(){
    console.log("change");
    window.location.replace('music4you.html');
  });
});

function loadEventos(){
    console.log("eventos");
}