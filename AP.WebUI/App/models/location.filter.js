define(['config'], function (config) {
    
 var Distance = function (description, value) {
        this.description = description;
        this.valueMeters = value;
    };
    var self = this;
    self.selectedLocation = {
        lat: ko.observable(34.016598),
        lng: ko.observable(-118.496756),
        googleobject: ko.observable(),
        name: ko.observable('3rd Street Promenade, Santa Monica, CA')
    };


    self.autocompleteText = ko.observable();//.extend({ throttle: config.throttle });
    //self.categorySearch = ko.observable("entertainment, fun, restaurant");
    self.categorySearch = ko.observable("");
    self.sort = ko.observable('1'); //default
    self.radius_filter = ko.observable(new Distance("1 mile", 1609)); //Distance in meters
    
    self.availableDistances = ko.observableArray([new Distance("1 mile", 1609), new Distance("2 miles", 3218), new Distance("3 miles", 4800), new Distance("5 miles", 8000), new Distance("8 miles", 13000), new Distance("10 miles", 16000)]);

    self.currentPlan = ko.observable();

    return {
        selectedLocation: selectedLocation,
        autocompleteText: autocompleteText,
        categorySearch: categorySearch,
        sort: sort,
        radius_filter: radius_filter,
        availableDistances: availableDistances,
        currentPlan: currentPlan,
        Distance: Distance,
    
    };
});