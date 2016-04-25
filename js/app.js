var initialPlaces = [
    {
        'name' : 'Vidhana Soudha',
        'latLng' : {'lat' : 12.97971,'lng' : 77.59079},
        'description': 'The Vidhana Soudha located in Bengaluru (Bangalore), is the seat of the state legislature of Karnataka. It is an imposing building, constructed in a style sometimes described as Mysore Neo-Dravidian, and incorporates elements of Indo-Saracenic and Dravidian styles.The construction was completed in 1956.'
    },
    {
        'name' : 'Cubbon Park',
        'latLng' : {'lat' : 12.97559,'lng' : 77.59268},
        'description': 'Cubbon Park is a landmark \'lung\' area of the Bangalore city, located within the heart of city in the Central Administrative Area.'
    },
    {
        'name' : 'Visvesvaraya Museum',
        'latLng' : {'lat' : 12.97527,'lng' : 77.5963},
        'description': 'The Visvesvaraya Industrial and Technological Museum, Bangalore(VITM), India. a constituent unit of National Council of Science Museums (NCSM), Ministry of Culture, Government of India, was established in memory of Bharat Ratna Sir M Visvesvaraya.'
        
    },
    {
        'name' : 'Nehru Planetarium',
        'latLng' : {'lat' : 12.9848,'lng' : 77.589266},
        'description': 'Nehru Planetarium is the name given to 5 planetariums in India, named after India\'s first Prime Minister, Jawaharlal Nehru. One of them is situated in Bangalore'
    },
    {
        'name' : 'M. Chinnaswamy Stadium',
        'latLng' : {'lat' : 12.97866,'lng' : 77.59975},
        'description': 'The M. Chinnaswamy Stadium, located in Bangalore, Karnataka, is one of the cricket stadiums of India. Flanked by the picturesque Cubbon Park, Queen\'s Road, Cubbon and uptown MG Road, this four decade old stadium is situated in the heart of the city of Bangalore.'
    }
];

var wikiapi;
var $wikiElem;

var Place = function(data) {
    this.name = ko.observable(data.name);
    this.latLng = ko.observable(data.latLng);
    this.description = ko.observable(data.description);
};

var ViewModel = function() {
    var self = this;
    
    self.placeList = ko.observableArray([]);

    initialPlaces.forEach(function(place) {
        self.placeList.push(new Place(place));
    });
    
    self.query = ko.observable('');
    
    self.visiblePlaces = ko.observableArray();
    
    initialPlaces.forEach(function(place) {
        self.visiblePlaces.push(place);
    });
    var filterCounter = 0;
    
    self.filterPlaces = ko.computed(function() {
        //self.visiblePlaces.removeAll();
        
        return ko.utils.arrayFilter(self.placeList(), function(places){
            filterCounter++;
            var result = places.name().toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
            if (result && filterCounter > initialPlaces.length) { 
               self.visiblePlaces.push(places)
               places.marker.setVisible(true);
            }
            else if (!result && filterCounter > initialPlaces.length) {
                places.marker.setVisible(false);//.setVisible(false)
            }
            return result;
        });
    });
    
    self.placeClick = function(clickedPlace){
        if (this.name) {
            infoWindow.setPosition(clickedPlace.marker.position);
            infoWindow.setContent('<p class="lead">'+clickedPlace.name()+'</p><br><p>'+clickedPlace.description()+'</p>');
            infoWindow.open(map, marker);
           for(var i = 0; i< self.placeList().length; i++){
                self.placeList()[i].marker.setAnimation(null);
            }
            map.panTo(clickedPlace.latLng());
            clickedPlace.marker.setAnimation(google.maps.Animation.BOUNCE);
            wikiapi = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+ this.name();
            $wikiElem = $('#wiki-panel');
            $wikiElem.html('');
            $.ajax({
                'url': wikiapi,
                'dataType': 'jsonp',
                'success': function(data) {
                    $.each(data[1], function(i, item) {
                        $wikiElem.append('<p><a href="https://en.wikipedia.org/wiki/'+item+'"target="blank" >'+item+'</a></p>');
                    });
                }
            });
        }
    };
    
    self.markerClick = function(c) {
        
        infoWindow.setPosition(c.position);
        infoWindow.open(map, marker);
        self.placeList().forEach(function(place) {
            place.marker.setAnimation(null);
            if(place.marker.position === c.position) {
                infoWindow.setContent('<p class="lead">'+place.name()+'</p><br><p>'+place.description()+'</p>');
                place.marker.setAnimation(google.maps.Animation.BOUNCE);
                wikiapi = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+ place.name();
                $wikiElem = $('#wiki-panel');
                $wikiElem.html('');
                $.ajax({
                    'url': wikiapi,
                    'dataType': 'jsonp',
                    'success': function(data) {
                        $.each(data[1], function(i, item) {
                            $wikiElem.append('<p><a href="https://en.wikipedia.org/wiki/'+item+'"target="blank" >'+item+'</a></p>');
                        });
                    }
                });
            }
        });
    }
};

var myViewM = new ViewModel();
ko.applyBindings(myViewM);