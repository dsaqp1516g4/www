$(function(){

    loadEvents();
    $( "#start" ).datepicker({
    dateFormat: "yy-mm-dd"
    });
    $( "#end" ).datepicker({
    dateFormat: "yy-mm-dd"
    });

    console.log(document.getElementById("myLocations").selectedIndex);
    
   });

$( "#form-evento" ).submit(function( event ) {
    event.preventDefault();
    var longitud;
    var latitud;
    var opcion = document.getElementById("myLocations").selectedIndex;
    if(opcion=="7"){
        longitud = $("#inputLong").val();
        latitud = $("#inputLat").val();
    }
    else if(opcion == "1"){
        longitud = 1.4026176;
        latitud = 38.8854288;
    }
    else if(opcion == "2"){
        longitud = 2.1507653;
        latitud = 41.361585;
    }
    else if(opcion == "3"){
        longitud = 2.1197694;
        latitud = 41.3802436;
    }
    else if(opcion == "4"){
        longitud = 4.3832738;
        latitud = 51.0914213;
    }
    else if(opcion == "5"){
        longitud = 1.4083951;
        latitud = 38.9481117;
    }
    else if(opcion == "6"){
        longitud = 3.0378106;
        latitud = 42.8278437;
    }
    else {
         longitud = null;
        latitud = null;
    }
    
    crearEvent($("#inputTitol").val(), $("#inputText").val(), latitud, longitud, $("#start").val(), $("#end").val(), function(){
    console.log("change");
  });
});

$(document).ready(function(){

    $("#myLocations").change(function(){

        $(this).find("option:selected").each(function(){

            if($(this).attr("value")=="7"){
                console.log("7");
                $("#coordenadas").show();

            }

            else{

                $("#coordenadas").hide();

            }

        });

    }).change();

});
