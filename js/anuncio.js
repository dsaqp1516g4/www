var BASE_URI = "http://localhost:8080/music4you"


$(function(){
    var authToken = JSON.parse(sessionStorage["auth-token"]);
    var currentAnunciosUri = authToken["links"]["current-anuncios"].uri;
    
    
    loadAnuncios();

    //loadAnuncios(currentStingsUri, function(stings){
    //    $("#anuncio_result").empty();
        //processStingCollection(stings);
   });

$( "#form-anuncio" ).submit(function( event ) {
  event.preventDefault();
  createAnuncio($("#inputSubject").val(), $("#inputDescription").val(), $("#inputPrice").val(), $("#inputType").val(), function(){
  	console.log("change");

  	window.location.replace('index.html');
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




