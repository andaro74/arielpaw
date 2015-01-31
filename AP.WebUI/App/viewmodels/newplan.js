define(function (require) {
    var datacontext = require('services/datacontext'),
        router = require('plugins/router'),
        app = require('durandal/app'),
        bindingHandlers = require('ko.bindingHandlers'),
        model = require('models/andaro.model'),
        locationFilter = require('models/location.filter');

    var plan = ko.observable(),
        isSelected = ko.observable(true),
        message = ko.observable('Enter the name of the plan:'),
        title = ko.observable('Create a plan');
        searchDate = ko.observable(new Date()),
        searchTime = ko.observable(moment(new Date()).startOf('hour').add("m", 60).format("hh:mm a")),
        validationMessage = ko.observable(),
        cityofeventValidation = ko.observable(''),
        hasErrors = ko.observable(false);

    var searchDateTime = ko.computed(function () {
        var result = '';
        if ((!searchDate() && !searchTime()))
            return result;
        result = moment(searchDate()).format('MMMM D YYYY') + ', ' + searchTime();
        result = moment(result).format();
        return result;
    });
    
    var cancel = function () {
        router.navigate('#');
    };


    var setCurrent = function () {
        if (Modernizr.geolocation) {
            navigator.geolocation.getCurrentPosition(show_map);
        } /*else {
            // no native support; maybe try a fallback?
        }*/
    }
    

    function show_map(position) {
        //https://developers.google.com/maps/documentation/javascript/examples/geocoding-simple

        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

       geocoder.geocode({ 'latLng': latlng }, function (results, status) {
           if (status == google.maps.GeocoderStatus.OK) {
               if (results[1]) {
                   /*map.setZoom(11);
                   marker = new google.maps.Marker({
                       position: latlng,
                       map: map
                   });
                   infowindow.setContent(results[1].formatted_address);
                   infowindow.open(map, marker);*/

                   locationFilter.selectedLocation.lat(latlng.lat());
                   locationFilter.selectedLocation.lng(latlng.lng())

                   locationFilter.selectedLocation.name(results[1].formatted_address);
                   locationFilter.autoCompleteText = results[1].formatted_address;

               } else {
                   alert('No results found');
               }
           } else {
               alert('Geocoder failed due to: ' + status);
           }
       });
       
    }

    var save = function () {
        hasErrors(false);
        //Clear previous error boxes
        vm.cityofeventValidation('');
        vm.plan.Name.valueHasMutated(); //This is to re-evaluate the observables.
        if (vm.plan.Errors().length > 0)
        {

            vm.plan.Errors.showAllMessages(true);
            hasErrors(true);
        }

        if (vm.locationFilter.selectedLocation.lat() === undefined ||
            vm.locationFilter.selectedLocation.lat() === null ||
            vm.locationFilter.selectedLocation.lng() === undefined ||
            vm.locationFilter.selectedLocation.lng() === null ||
            vm.locationFilter.selectedLocation.name() === undefined ||
            vm.locationFilter.selectedLocation.name() === null ||
            vm.locationFilter.selectedLocation.name().length === 0)
        {

            vm.cityofeventValidation("* Please enter a valid location")
            hasErrors(true);
                
        }

        if (hasErrors()===true)
            return false;
        

        var defMethod = datacontext.Plans.Create;
 
        vm.plan.StartDate(searchDateTime());
        vm.plan.Lat(locationFilter.selectedLocation.lat());
        vm.plan.Lng(locationFilter.selectedLocation.lng());
        vm.plan.SelectedLocationName(locationFilter.selectedLocation.name());

        $.when(defMethod(vm.plan)).done(function (resultPlan) {
            //Clear the selected location
            locationFilter.selectedLocation.lat(null);
            locationFilter.selectedLocation.lng(null);
            locationFilter.selectedLocation.name(null);
            locationFilter.autoCompleteText = null;
            var url = '#/searchplaces/' + resultPlan.Id();
            router.navigate(url);
        });


    };

    var googleAutocompleteDefault = function (data, event) {
        if (event.which == 13) {
            return false;
        } else
            return true;
    };


    var activate = function () {

        locationFilter.selectedLocation.lat(null);
        locationFilter.selectedLocation.lng(null);
        locationFilter.selectedLocation.name(null);
        locationFilter.autoCompleteText = null; 

        vm.searchDate(new Date());
        vm.searchTime(moment(new Date()).startOf('hour').add("m", 60).format("hh:mm a"));

        var p = new model.Plan();
        p.Name();
        p.Description();
        vm.plan = p;

       

        return vm.plan;
    };


    var vm = {
        activate: activate,
        cancel: cancel,
        plan: plan,
        save: save,
        isSelected: isSelected,
        message: message,
        title: title,
        locationFilter: locationFilter,
        googleAutocompleteDefault: googleAutocompleteDefault,

        searchDate: searchDate,
        
        //timeOptions: { minuteStep: 15, defaultTime: 'current', showSeconds: false, showMeridian: true, template: 'dropdown', showInputs: true },
        timeOptions: { minuteStep: 15, defaultTime: 'current', showSeconds: false, showMeridian: true, template: 'modal', showInputs: true, appendWidgetTo: 'body' },

        dateOptions: { dateFormat: 'DD, d MM, yy', changeMonth: true, changeYear: true, minDate: new Date(), altField: '#alternate', altFormat: 'DD, d MM, yy' },
        searchTime: searchTime,
        cityofeventValidation: cityofeventValidation,
        hasErrors: hasErrors,

        setCurrent:setCurrent

    };

   
 
    return vm;


});