$(function(){
    loadPlaylist();
   });

$( "#crearplay" ).click(function( event ) {
  event.preventDefault();

    var artista=$("#inputArtista").val();
    var titulo=$("#inputTitulo").val();
    var link=$("#inputLink").val();
    var audio = $('#inputAudio')[0].files[0];
    
    event.preventDefault();
    $('progress').toggle();
    var formData = new FormData();
    formData.append('artist', artista);
    formData.append('title', titulo);
    formData.append('youtubelink', link);
    formData.append('audio', audio);
    crearPlay(formData);    
  });
