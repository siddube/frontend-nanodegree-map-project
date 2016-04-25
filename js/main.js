$(document).ready(function(){
    //navbar toggle
    $('.navbar-toggle').click(function(){
        $('.sidebar-wrapper').toggleClass('in');
        if($('.sidebar-wrapper').hasClass('in')){
            $('.sidebar-wrapper').css('left','-100%').css('height','0').css('min-height','0');
            $('#map').parent().removeClass('col-md-10');
            $('#map').parent().addClass('col-md-12');
            $('#wiki-wrapper').parent().removeClass('col-md-offset-2');
            $('#wiki-wrapper').parent().removeClass('col-md-10');
            $('#wiki-wrapper').parent().addClass('col-md-12');
        }
        else {
            $('.sidebar-wrapper').css('left','0').css('height','auto').css('min-height','60vh');
            $('#map').parent().removeClass('col-md-12');
            $('#map').parent().addClass('col-md-10');
            $('#wiki-wrapper').parent().addClass('col-md-offset-2');
            $('#wiki-wrapper').parent().removeClass('col-md-12');
            $('#wiki-wrapper').parent().addClass('col-md-10');
        }
    });

    //hide menu on small devices
    if(screen.width < 768) {
        $('.sidebar-wrapper').addClass('in');
        $('.sidebar-wrapper').css('left','-100%').css('height','0');
    }

    //ajax error handler
    $(document).ajaxError(function( event, request, settings ) {
        $('#wiki-panel').html('<p>Hmm! This is unusual but there is an error fetching Wiki articles</p>');
    });
});

//Google Map Variables
var map;
var marker;
var infoWindow;
var infoWindowContent;

//Google Map Init
function initMap() {
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 12.97959, lng: 77.59268},
        zoom: 15
    });
    //Add marker Property to initil Places
    //The marker Property is used to handle markers on filtering and clicking
    for(var i= 0; i<= initialPlaces.length - 1; i++) {
        var myLatLng = initialPlaces[i].latLng;
        var markerOptions = {
            map: map,
            position: myLatLng
        };
        myViewM.placeList()[i].marker = new google.maps.Marker(markerOptions);
        myViewM.placeList()[i].marker.addListener('click', function(e){
            myViewM.markerClick(this);
        });
    }
    //Add Info Window
    infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent,
        pixelOffset: new google.maps.Size(0, -50)
    });
}
