define(function (require) {
    var datacontext = require('services/datacontext'),
        router = require('plugins/router'),
        bindingHandlers = require('ko.bindingHandlers'),
        locationFilter = require('models/location.filter'),
        app = require('durandal/app'),
        model = require('models/andaro.model');

    var self = this;
    self.plan = ko.observable();
    
    var create = function () {
        var url = '#/newplan';
        router.navigate(url);
    };

    var googleAutocompleteDefault = function (data, event) {
        if (event.which == 13) {
            return false;
        } else
            return true;
    };

    var viewplans = function () {
        var url = '#/plans';
        router.navigate(url);
    };

    var activate = function () {
        return true;
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
   

    var vm = {
        activate: activate,
        title: 'Default',
        plan: plan,
        create: create,
        viewplans: viewplans,
        locationFilter: locationFilter,
        googleAutocompleteDefault: googleAutocompleteDefault,
        welcomeMsg: 'Welcome ' + $("#userIdentityName").val() + '!',
        setCurrent: setCurrent

    };


    return vm;


});