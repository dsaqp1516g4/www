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

$( "#editPlay" ).click(function( event ) {
  event.preventDefault();
var id = localStorage.getItem('idplay');
    console.log("id playlist", id);
    var artista=$("#artista").val();
    var titulo=$("#titulo").val();
    var enlace=$("#enlace").val();
     
    event.preventDefault();
   /* var formData = new FormData();
    formData.append('id', id);
    formData.append('subject', subject);
    formData.append('description', description);
    formData.append('precio', precio);
    formData.append('type', type);*/
   
   // alert(FormData);
    putPlay(id, artista,titulo,enlace);
    console.log("playlist editado (from playlist.js)");
 });


