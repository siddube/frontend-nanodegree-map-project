var initialPlaces = [
    {
        'name' : 'Lal Bagh',
        'lat' : '12.95008',
        'long' : '77.58582'
    },
    {
        'name' : 'Vidhana Soudha',
        'lat' : '12.97971',
        'long' : '77.59079'
    },
    {
        'name' : 'Cubbon Park',
        'lat' : '12.97559',
        'long' : '77.59268'
    },
    {
        'name' : 'Visvesvaraya Museum',
        'lat' : '12.97527',
        'long' : '77.5963'
    },
    {
        'name' : 'Bannerghatta Biological Park',
        'lat' : '12.76530',
        'long' : '77.56605'
    },
    {
        'name' : 'Bangalore Palace',
        'lat' : '12.99861',
        'long':	'77.59228'
    },
    {
        'name' : 'Tippu Sultan Summer Palace',
        'lat' : '12.99861',
        'long':	'77.59228'
    },
    {
        'name' : 'M. Chinnaswamy Stadium',
        'lat' : '12.97866',
        'long':	'77.59975'
        	
    },
    {
        'name' : 'ISKCON Bangalore',
        'lat' : '13.01041',
        'long' : '77.55091'
    }
];

var Place = function(data) {
    this.name = ko.observable(data.name);
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