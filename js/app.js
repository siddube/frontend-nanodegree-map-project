var initialPlaces = [
    {
        'name' : 'Vidhana Soudha',
        'latLng' : {'lat' : 12.97971,'lng' : 77.59079}
    },
    {
        'name' : 'Cubbon Park',
        'latLng' : {'lat' : 12.97559,'lng' : 77.59268}
    },
    {
        'name' : 'Visvesvaraya Museum',
        'latLng' : {'lat' : 12.97527,'lng' : 77.5963}
    },
    {
        'name' : 'Jawaharlal Nehru Planetarium',
        'latLng' : {'lat' : 12.9848,'lng' : 77.589266}
    },
    {
        'name' : 'M. Chinnaswamy Stadium',
        'latLng' : {'lat' : 12.97866,'lng' : 77.59975}
    }
];



var Place = function(data) {
    this.name = ko.observable(data.name);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
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
    var counter = 0;
    self.filterPlaces = ko.computed(function() {
        //self.visiblePlaces.removeAll();
        
        return ko.utils.arrayFilter(self.placeList(), function(places){
            counter++;
            thatPlace = places;
            var result = places.name().toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
            if (result && counter > initialPlaces.length) { 
               self.visiblePlaces.push(places)
               places.marker.setVisible(true);
            }
            else if (!result && counter > initialPlaces.length) {
                places.marker.setVisible(false);//.setVisible(false)
            }
            return result;
        });
    });
};

var myViewM = new ViewModel();
ko.applyBindings(myViewM);