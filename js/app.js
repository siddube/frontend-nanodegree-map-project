var initialPlaces = [
    {
        'name' : 'Vidhana Soudha',
        'lat' : '12.97971',
        'lng' : '77.59079'
    },
    {
        'name' : 'Cubbon Park',
        'lat' : '12.97559',
        'lng' : '77.59268'
    },
    {
        'name' : 'Visvesvaraya Museum',
        'lat' : '12.97527',
        'lng' : '77.5963'
    },
    {
        'name' : 'Jawaharlal Nehru Planetarium',
        'lat' : '12.9848',
        'lng':	'77.589266'
    },
    {
        'name' : 'M. Chinnaswamy Stadium',
        'lat' : '12.97866',
        'lng':	'77.59975'
    }
    
];

var Place = function(data) {
    this.name = ko.observable(data.name);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
};

var ViewModel = function() {
    var self = this;

    this.placeList = ko.observableArray([]);

    initialPlaces.forEach(function(placeItem) {
        self.placeList.push(new Place(placeItem));
    });

    this.currentPlace = ko.observable( this.placeList()[0] );

    this.changePlace = function(place) {
        self.currentPlace(place);
    };
};

ko.applyBindings(new ViewModel());