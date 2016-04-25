//Intersting Places JSON
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


//Individual Place Object
var Place = function(data) {
    this.name = ko.observable(data.name);
    this.latLng = ko.observable(data.latLng);
    this.description = ko.observable(data.description);
};

//View Model for Knockout
var ViewModel = function() {
    var self = this; //Use this to access View Model from other parts of code

    //Create Observable array and push places to it
    self.placeList = ko.observableArray([]);

    initialPlaces.forEach(function(place) {
        self.placeList.push(new Place(place));
    });

    self.query = ko.observable(''); //Filter Query

    self.visiblePlaces = ko.observableArray();// Observable array of visible places after filtering

    initialPlaces.forEach(function(place) {
        self.visiblePlaces.push(place);
    });

    //Filter Search Functionality
    //Setup a counter variable and initialize it to zero
    //This is a hack to access places' markers
    //The filter has to run a minimum number of times equal to items in initialplaces JSON
    //If not undefined values try and access markers and interpreter throws an error
    var filterCounter = 0;

    self.filterPlaces = ko.computed(function() {
        //self.visiblePlaces.removeAll();

        return ko.utils.arrayFilter(self.placeList(), function(places){
            filterCounter++; //increment counter
            //if names match store it to result to be returned
            var result = places.name().toLowerCase().indexOf(self.query().toLowerCase()) >= 0;

            if (result && filterCounter > initialPlaces.length) {
               self.visiblePlaces.push(places);
               places.marker.setVisible(true);
            }
            else if (!result && filterCounter > initialPlaces.length) {
                places.marker.setVisible(false);//.setVisible(false)
            }
            return result;
        });
    });

    //Wiki Api Variables
    var wikiapi;
    var $wikiElem;
    //Data bind function for list view click
    self.placeClick = function(clickedPlace){
        if (this.name) {
            //setup Info Window
            infoWindow.setPosition(clickedPlace.marker.position);
            infoWindow.setContent('<p class="lead">'+clickedPlace.name()+'</p><br><p>'+clickedPlace.description()+'</p>');
            infoWindow.open(map, marker);

            //Set All Animations to Null
            //Pan Map to Clicked Place
            //Start Animating the marker linked to click
            for(var i = 0; i< self.placeList().length; i++){
                self.placeList()[i].marker.setAnimation(null);
            }
            map.panTo(clickedPlace.latLng());
            clickedPlace.marker.setAnimation(google.maps.Animation.BOUNCE);

            //Setup Wiki Api Ajax Request
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

        //Setup Info Window
        infoWindow.setPosition(c.position);
        infoWindow.open(map, marker);

        //Loop Through PlaceList and see if any match to the marker clicked
        //This should only return only one value
        self.placeList().forEach(function(place) {
            place.marker.setAnimation(null); // Set All Animation to Null
            if(place.marker.position === c.position) { //If Marker Positions Match
                infoWindow.setContent('<p class="lead">'+place.name()+'</p><br><p>'+place.description()+'</p>'); // Setup Content
                place.marker.setAnimation(google.maps.Animation.BOUNCE); // Animate Marker Linked to the click

                //Make Ajax call to Wiki Api
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
    };
};

var myViewM = new ViewModel();
ko.applyBindings(myViewM);