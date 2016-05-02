var BASE_URI= "http://0.0.0.0:8080/music4you"

function registrarUsuario (formdata){
    loadAPI(function(){
        var api = JSON.parse(sessionStorage.api);
        var uri=api.user.uri;
        $.ajax({
            url: uri,
		    type: 'POST',
            xhr: function(){
                var myXhr=$.ajaxSettings.xhr();
                if(myXhr.upload){
                    myXhr.upload.addEventListener('progress',progressHandlingFunction,false);
                }
                return myXhr;
            },
            crossDomain: true,
            data: formdata,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(data, status,jqxhr){
            var response = $.parseJSON(jqxhr.responseText);
            var lastfilename = response.filname;
            $('progress').toggle();
            window.location.replace('index.html');
        }).fail(function(jqXHR, textStatus) {
           var error = JSON.parse(jqXHR.responseText);
            $("#vacio").text("");
            $("#vacio").append('<div class="alert alert-block alert-info"><p><span style="color:red">'+error.reason+'</span></p></div>'); 
        });
        
    });
} 
