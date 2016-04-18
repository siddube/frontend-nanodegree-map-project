$(document).ready(function(){
    $('.navbar-toggle').click(function(){
        $('.sidebar-wrapper').toggleClass('in');
        if($('.sidebar-wrapper').hasClass('in')){
            $('.sidebar-wrapper').css('left','-100%').css('height','0');
            $('#map').parent().removeClass('col-sm-10');
            $('#map').parent().addClass('col-sm-12');
        }
        else {
            $('.sidebar-wrapper').css('left','0').css('height','auto');
            $('#map').parent().removeClass('col-sm-12');
            $('#map').parent().addClass('col-sm-10');
        }
    });
    if(screen.width < 768) {
        $('.sidebar-wrapper').addClass('in')
        $('.sidebar-wrapper').css('left','-100%').css('height','0');
    }
});

function initMap() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 12.9716, lng: 77.5946},
    zoom: 13
    });
}