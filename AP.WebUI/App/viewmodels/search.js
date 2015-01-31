
define(['services/logger', 'durandal/app', 'config', 'plugins/router' ,'models/location.filter', 'ko.bindingHandlers', 'models/location.map'],
    function (logger, app, config, router, locationFilter, bindingHandlers,locationmap) {
       
        var self = this;
        self.autocompleteText = locationFilter.autocompleteText,
        self.map = locationmap.map,
        self.mapvisible = locationmap.mapvisible,
        self.mapText = locationmap.mapText,
        self.showHideMapContainer = locationmap.showHideMapContainer,
        self.categorySearch = locationFilter.categorySearch,
        self.mapvisible(false),
        self.mapText('Show Map'),
        self.availableDistances = ko.observableArray(),
        self.radius_filter = locationFilter.radius_filter;

        var findLocations = function(param) {
            //Trigger the publisher so everyone can listen this event.
            app.trigger('location:changed', locationFilter);
        };

        var Distance = function (description, value) {
            this.description = description;
            this.valueMeters = value;
        };

        var goBack = function () {
            router.navigateBack();
        };

        function activate() {
            vm.availableDistances([new Distance("1 MI", 1600), new Distance("3 MI", 4800), new Distance("5 MI", 8000), new Distance("8 MI", 13000), new Distance("10 MI", 16000)]);
            return true;
        }

        var vm = {
            activate: activate,
            autocompleteText: autocompleteText,
            mapvisible: mapvisible,
            mapText: mapText,
            showHideMapContainer: showHideMapContainer,
            map: map,
            categorySearch: categorySearch,
            findLocations: findLocations,
            availableDistances: availableDistances,
            radius_filter: radius_filter,
            goBack: goBack,
            locationFilter:locationFilter
            };
        return vm;


    });