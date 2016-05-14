//var BASE_URI = "http://127.0.0.1:8080/music4you"

$( "#form-signin" ).submit(function( event ) {
  event.preventDefault();
  login($("#inputLoginid").val(), $("#inputPassword").val(), function(){
  	console.log("change");
  	window.location.replace('music4you.html');
  });
});

$( "#form-signout" ).click(function( event ) {
  event.preventDefault();
  logout(function(){
  	console.log("logout");
  	window.location.replace('index.html');
  });
});


/* 

function linksToMap(links){
		console.log("function links");

	var map = {};
	$.each(links, function(i, link){
		$.each(link.rels, function(j, rel){
			map[rel] = link;
		});
	});

	return map;
}

function loadAPI(complete){
	$.get(BASE_URI)
		.done(function(data){
			var api = linksToMap(data.links);
			sessionStorage["api"] = JSON.stringify(api);
			complete();
		})
		.fail(function(data){
		});
} 

function login(loginid, password, complete){
    console.log("Hfunction login: "+loginid+" amb password: " +password+" complete: "+complete)
	loadAPI(function(){
		var api = JSON.parse(sessionStorage.api);
		//var uri = api.login.uri;
                var uri = BASE_URI+"/login";
		$.post(uri,
			{
				login: loginid,
				password: password
			}).done(function(authToken){
				authToken.links = linksToMap(authToken.links);
				sessionStorage["auth-token"] = JSON.stringify(authToken);
                                //window.location.replace("music4you.html");
				complete();
			}).fail(function(jqXHR, textStatus, errorThrown){
				var error = jqXHR.responseJSON;
				alert(error.reason);
			}
		);
	});
}

function logout(complete){
	var authToken = JSON.parse(sessionStorage["auth-token"]);
	var uri = authToken["links"]["logout"].uri;
	console.log(authToken.token);
	$.ajax({
    	type: 'DELETE',
   		url: uri,
    	headers: {
        	"X-Auth-Token":authToken.token
    	}
    }).done(function(data) { 
    	sessionStorage.removeItem("api");
    	sessionStorage.removeItem("auth-token");
    	complete();
  	}).fail(function(){});
} 

*/