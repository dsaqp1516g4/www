$(function(){
    //var authToken = JSON.parse(sessionStorage["auth-token"]);
    //var currentAnunciosUri = authToken["links"]["current-anuncios"].uri;
    
    
    loadEvents();
    $( "#start" ).datepicker();
    $( "#end" ).datepicker();

    //loadAnuncios(currentStingsUri, function(stings){
    //    $("#anuncio_result").empty();
        //processStingCollection(stings);
   });

$( "#form-evento" ).submit(function( event ) {
    event.preventDefault();
    crearEvento($("#inputTitol").val(), $("#inputText").val(), $("#inputLat").val(), $("#inputLong").val(), $("#start").val(), $("#end").val(), function(){
    console.log("change");
    window.document.reload;
  });
});
