$(document).ready(function(){
    $('.navbar-toggle').click(function(){
        $('.sidebar-wrapper').toggleClass('in');
        if($('.sidebar-wrapper').hasClass('in')){
            $('.sidebar-wrapper').css('left','-100%').css('height','0').css('min-height','0');
            $('#map').parent().removeClass('col-md-10');
            $('#map').parent().addClass('col-md-12');
            $('#wiki-wrapper').parent().removeClass('col-md-offset-2');
            $('#wiki-wrapper').parent().removeClass('col-md-5');
            $('#wiki-wrapper').parent().addClass('col-md-6');
            $('#places-wrapper').parent().removeClass('col-md-5');
            $('#places-wrapper').parent().addClass('col-md-6');
        }
        else {
            $('.sidebar-wrapper').css('left','0').css('height','auto').css('min-height','60vh');
            $('#map').parent().removeClass('col-md-12');
            $('#map').parent().addClass('col-md-10');
            $('#wiki-wrapper').parent().addClass('col-md-offset-2');
            $('#wiki-wrapper').parent().removeClass('col-md-6');
            $('#wiki-wrapper').parent().addClass('col-md-5');
            $('#places-wrapper').parent().removeClass('col-md-6');
            $('#places-wrapper').parent().addClass('col-md-5');
        }
    });
    if(screen.width < 768) {
        $('.sidebar-wrapper').addClass('in')
        $('.sidebar-wrapper').css('left','-100%').css('height','0');
    }
});
var marker;
function initMap() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 12.97959, lng: 77.59268},
        zoom: 15
    });
    for(var i= 0; i<= initialPlaces.length - 1; i++) {
        var myLatLng = initialPlaces[i].latLng;
        var markerOptions = {
            map: map,
            position: myLatLng
        };
    
    myViewM.placeList()[i].marker = new google.maps.Marker(markerOptions);
    }
}

