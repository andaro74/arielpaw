
define(function (require) {
        var logger = require('services/logger');
        var app = require('durandal/app');
        var config = require('config');
        var locationFilter = require('models/location.filter');
        var locationmap = require('models/location.map')
            

    var self = this;

    var googlePlaceSearchResult = function() {

        var autoCompletePlace = locationFilter.autocompleteText.getPlace();

        if (autoCompletePlace.name !== '') {
            locationFilter.selectedLocation.googleobject(autoCompletePlace);
            locationFilter.selectedLocation.lat(autoCompletePlace.geometry.location.lat());
            locationFilter.selectedLocation.lng(autoCompletePlace.geometry.location.lng());

            locationFilter.selectedLocation.name(autoCompletePlace.name);
            //Trigger the publisher so everyone can listen this event.
            //app.trigger('location:changed', locationFilter);

        }
    };


    ko.bindingHandlers.googleAutoComplete = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            locationFilter.autocompleteText = new google.maps.places.Autocomplete($(element)[0]);

            //This event will trigger when the place has changed in the box
            google.maps.event.addListener(locationFilter.autocompleteText, 'place_changed', googlePlaceSearchResult);

            /*locationFilter.selectedLocation.lat(autoCompletePlace.geometry.location.lat());
            locationFilter.selectedLocation.lng(autoCompletePlace.geometry.location.lng());*/

            //Trigger the publisher so everyone can listen this event.
            //app.trigger('location:changed', locationFilter);
        }
      
    };
    


    ko.bindingHandlers.googleMap = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            var tmpMap = new google.maps.Map($(element)[0], { mapTypeId: google.maps.MapTypeId.ROADMAP, zoom: 16, scrollwheel: false });

            viewModel.map(tmpMap);
            var centermap = new google.maps.LatLng(locationFilter.selectedLocation.lat(), locationFilter.selectedLocation.lng());
            viewModel.map().setCenter(centermap);
            viewModel.setCentralMarker(centermap);

            if (viewModel.map() !== undefined)
                google.maps.event.trigger(viewModel.map(), 'resize');

        }

        /*,
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            
            logger.log('Search textbox has changed from binding handler', value, null, true);
            var autoCompletePlace = locationFilter.autocompleteText.getPlace();
            //In case the textbox is empty then fill it up
            if  (autoCompletePlace) {
                
                logger.log('Search textbox update info', autoCompletePlace.formatted_address, null, true);
                //$(element).val(new Date().getTime());
            }

            //This is publishing the change that just happened in the textbox.
            //By default the app has triggers built in
           // app.trigger('location:changed', value);
        }*/
    };
    

    ko.bindingHandlers.datepicker = {
        //http://stackoverflow.com/questions/11121960/bootstrap-datepicker-with-knockout-js-databind
        init: function (element, valueAccessor, allBindingsAccessor) {
            //initialize datepicker with some optional options
            var options = allBindingsAccessor().datepickerOptions || {};
            $(element).datepicker(options);

            //handle the field changing
            ko.utils.registerEventHandler(element, "change", function () {
                var observable = valueAccessor();
                observable($(element).datepicker("getDate"));
            });

            //handle disposal (if KO removes by the template binding)
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).datepicker("destroy");
            });

        },
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor()),
                current = $(element).datepicker("getDate");

            if (value - current !== 0) {
                $(element).datepicker("setDate", value);
            }
        }
    };

    ko.bindingHandlers.timepicker = {
        //http://jdewit.github.io/bootstrap-timepicker/
        //http://stackoverflow.com/questions/11121960/bootstrap-datepicker-with-knockout-js-databind
        init: function (element, valueAccessor, allBindingsAccessor) {
            //initialize timepicker with some optional options
            var options = allBindingsAccessor().timepickerOptions || {};
            $(element).timepicker(options);

            //handle the field changing
            ko.utils.registerEventHandler(element, "changeTime.timepicker", function (event) {
                var value = valueAccessor();
                if (ko.isObservable(value)) {
                    value(event.time.value);
                }
            });
        },
        update: function (element, valueAccessor) {
           /* var widget = $(element).data("timepicker");
            //when the view model is updated, update the widget
            if (widget) {
                widget.time = ko.utils.unwrapObservable(valueAccessor());
                if (widget.time) {
                    var m = widget;
                }
            }*/
            
            var value = ko.utils.unwrapObservable(valueAccessor());
            $(element).timepicker('setTime', value);
        }
    };
    
    
    ko.bindingHandlers.showHideMap = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            // First get the latest data that we're bound to
            var value = valueAccessor(), allBindings = allBindingsAccessor();

            // Next, whether or not the supplied model property is observable, get its current value
            var valueUnwrapped = ko.utils.unwrapObservable(value);

            // Grab some more data from another binding property
            var duration = allBindings.slideDuration || 400; // 400ms is default duration unless otherwise specified

            // Now manipulate the DOM element
            if (valueUnwrapped == true) {
                $('#map_container').slideDown(duration); // Make the element visible

                if (map() !== undefined)
                    google.maps.event.trigger(map(), 'resize');
                
                //Load the businesses into the map
                app.trigger('businesses:loaded', businesses);

                var centermap = new google.maps.LatLng(locationFilter.selectedLocation.lat(), locationFilter.selectedLocation.lng());
                map().setCenter(centermap);
                

            } else
                $('#map_container').slideUp(duration); // Make the element invisible

        }
    };


    //execute a handler for the enter key
    ko.bindingHandlers.enter = {
        init: function (element, valueAccessor, allBindingsAccessor, data) {
            //wrap the handler with a check for the enter key
            var wrappedHandler = function (data, event) {
                if (event.keyCode === 13) {
                    valueAccessor().call(this, data, event);
                }
            };
            //call the real event binding for 'keyup' with our wrapped handler
            ko.bindingHandlers.event.init(element, function () { return { keyup: wrappedHandler }; }, allBindingsAccessor, data);
        }
    };

    //binding handler to show the share button
    ko.bindingHandlers.render_share = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var fb = valueAccessor();
            $(element).attr(fb);
            FB.XFBML.parse(element);
        }
    };



   
});