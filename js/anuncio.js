//$(function(){
    //var authToken = JSON.parse(sessionStorage["auth-token"]);
    //var currentAnunciosUri = authToken["links"]["current-anuncios"].uri;
    
  //  loadAnuncios();

    //loadAnuncios(currentStingsUri, function(stings){
    //    $("#anuncio_result").empty();
        //processStingCollection(stings);
  // });

$( "#crearanuncio" ).click(function( event ) {
  event.preventDefault();

    var subject=$("#inputSubject").val();
     var description=$("#inputDescription").val();
    var precio=$("#inputPrice").val();
    var type=$("#inputType").val();
    var image = $('#imagen')[0].files[0];
console.log("se supone que img es :", image)
    event.preventDefault();
    $('progress').toggle();
    var formData = new FormData();
    formData.append('subject', subject);
    formData.append('description', description);
    formData.append('precio', precio);
    formData.append('type', type);
    formData.append('image', image);    
    console.log("form data es ::", formData);
    crearAnuncio(formData);
    console.log('ads creado');

  //crearAnuncio($('#inputSubject').val(), $('#inputDescription').val(), $('#inputPrice').val(), $('#inputType').val(),$('#img').val(), function(){
  //	console.log("img value",$('#img').val());
  
  });


$( "#form-comentario2").submit(function( event ) {
    event.preventDefault();
    crearComment(anuncio1.id, null, $('#inputComment2').val(), function(){
    //window.location.replace('music4you.html');
  });
});


/* function AnuncioCollection (anuncioCollection){ 
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
            $('#pagination').append(' <a onClick="loadAnuncios(\'' + next + '\');" style = "cursor: pointer; cursor: hand;"><div class="span3"><button class="btn btn-box">Next</button></div></a>');
        }
        else if (anuncioCollection.pagbefore==anuncioCollection.pagtotal){
             $('#pagination').append(' <a onClick="loadAnuncios(\'' + prev + '\');" style = "cursor: pointer; cursor: hand; "><div class="span3"><button class="btn btn-box">Previous</button></div></a>');
        }
        else{
        if(prev){
            $('#pagination').append(' <a onClick="loadAnuncios(\'' + prev + '\');" style = "cursor: pointer; cursor: hand; "><div class="span3"><button class="btn btn-box">Previous</button></div></a>');
        }
        if(next){
           $('#pagination').append(' <a onClick="loadAnuncios(\'' + next + '\');" style = "cursor: pointer; cursor: hand; "><div class="span3"><button class="btn btn-box">Next</button></div></a>');
        }
        }
        return html;
    }
} */




