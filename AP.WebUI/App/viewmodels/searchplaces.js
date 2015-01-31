define(function (require) {
    var datacontext = require('services/datacontext'),
        router = require('plugins/router'),
        app = require('durandal/app'),
        locationFilter = require('models/location.filter'),
        model = require('models/andaro.model'),
        locationmap = require('models/location.map'),
        bindingHandlers = require('ko.bindingHandlers');

    var self = this;
  
    self.businesses = ko.observableArray(),
    self.plan = ko.observable();

    var findLocations = function (param) {
        onFilterChange(vm.locationFilter);
    };


    var clearCategory = function (param) {
        vm.locationFilter.categorySearch("");
    };

   

    var goBack = function () {
        router.navigateBack();
    };
    
    this.categoriesEnterKey = function (data, event) {
        if (event.which == 13) {
            return false;
        } else
            return true;
    };



    this.googleAutocompleteDefault = function (data, event) {
        if (event.which == 13) {
            return false;
        } else
            return true;
    };
    
    var onFilterChange = function (val) {

        var data = {
            terms: val.categorySearch(),
            radius_filter: val.radius_filter().valueMeters,
            lat: val.selectedLocation.lat(),
            lng: val.selectedLocation.lng(),
            sort: val.sort()
        };

        if (data.terms === "")
            data.terms = "entertainment, fun, restaurant";

        businesses([]);

        var callbacks = {
            success: function (results) {
                businesses(results);
                
            },

            error: function (eResult) {
                console.log('Could not get data from yelp' + eResult);
            }
        };

        datacontext.Yelp.GetBusinesses(data, callbacks);
    };

    //This is an observable of the collection
    businesses.subscribe(function (colBusinesses) {
        if (colBusinesses.length < 1)
            return;
        else {
            //Publishes the event once the businesses have been loaded.
            app.trigger('businesses:loaded', businesses);
        }
    });


   /* locationFilter.radius_filter.subscribe(function(val) {
        app.trigger('location:changed', locationFilter);
    });*/
    
   
    var showAddOptions = function (selectedBusiness) {
        if (selectedBusiness && selectedBusiness.id()) {
            var url = '#/activityitem/' + selectedBusiness.id() + '?pinfo=' + vm.plan.Id();
            router.navigate(url);
        }
    };

    function activate(id) {
            
            vm.locationmap.mapvisible(false);
            vm.locationmap.mapText('Show Map');

            if (vm.plan && (vm.plan.Id() === parseInt(id)))
                return;
        return datacontext.Plans.GetById(id).done(function (planResult) {
            vm.plan = planResult;
          
            if ((vm.locationFilter.selectedLocation.lat() !== vm.plan.Lat()) || (vm.locationFilter.selectedLocation.lng() !== vm.plan.Lng())) {
                vm.locationFilter.selectedLocation.lat(vm.plan.Lat());
                vm.locationFilter.selectedLocation.lng(vm.plan.Lng());
                vm.locationFilter.selectedLocation.name(vm.plan.SelectedLocationName());
                 onFilterChange(vm.locationFilter);

            }

       });
    }




    var vm = {
        activate: activate,
        businesses: businesses,
        showAddOptions: showAddOptions,
        findLocations: findLocations,
        locationFilter: locationFilter,
        locationmap: locationmap,
        goBack: goBack,
        categoriesEnterKey: categoriesEnterKey,
        clearCategory: clearCategory

    };

    return vm;
});