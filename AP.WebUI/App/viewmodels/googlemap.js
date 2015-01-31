define(function (require) {
    var logger = require('services/logger');
    var app = require('durandal/app');
    var config = require('config');
    var bindingHandlers = require('ko.bindingHandlers');
    var locationmap = require('models/location.map');
    var router = require('plugins/router');
       

    var self = this;
    self.map = locationmap.map;
    self.centralmarker = locationmap.centralmarker;
    self.markers = locationmap.markers;
    self.infowindow = locationmap.infowindow;
    self.mapOptions = locationmap.mapOptions;
    

    var onLocationChanged = function (val) {
        //Clear all the previous markers
        ko.utils.arrayForEach(markers(), function (mark) {
            if (mark)
                mark.setMap(null);
        });
        //Clear the main marker
        if (centralmarker())
            centralmarker().setMap(null);
        
        var centermap = new google.maps.LatLng(val.selectedLocation.lat(), val.selectedLocation.lng());
        map().setCenter(centermap);
        setCentralMarker(centermap);
    };
    
    var onBusinessesChanged = function (businesses) {
        //Create the markers
        ko.utils.arrayForEach(businesses(), function (item) {
            var marker = createMarker(item);
            markers.push(marker);
            
            google.maps.event.addListener(marker, 'click', function () {
                var self = this;
                var contentHTML = generateInfoWindowHtml(item);
                infowindow().setContent(contentHTML);
                infowindow().open(map(), self);
            });
        });
    };


    var setCentralMarker = function(mapLatLng) {
        //var location = place.location();
        var iconImg = '../../../Images/maps/star-3.png';
        //var placeLoc = new google.maps.LatLng(location.lat(), location.lng());
        /*if (mainLocationMarker() !== undefined)
            mainLocationMarker().setMap(null);
            */
        var marker = new google.maps.Marker({
            map: map(),
            position: mapLatLng,
            animation: google.maps.Animation.DROP,
            icon: iconImg
        });
        
        centralmarker(marker);
    };


    var createMarker = function(item) {
        var location = item.location;
        var iconImg = '../../../Images/maps/number_' + item.local_id() + '.png';

        var placeLoc = new google.maps.LatLng(item.lat(), item.lng());
        var marker = new google.maps.Marker({
            map: map(),
            position: placeLoc,
            animation: google.maps.Animation.DROP,
            icon: iconImg
        });

        return marker;
    };

    var generateInfoWindowHtml = function(biz) {
        //var biz = bz();
        var text = '<div class="marker">';

        // image and rating
        if (biz.image_url() !== undefined)
            text += '<img class="businessimage thumbnail" src="' + biz.image_url() + '"/>';
        else
            text += '<img class="businessimage thumbnail" src="/../../Images/blank_biz_medium_sq.png"/>';

        // div start
        text += '<div class="businessinfo">';
        //local number
        //text += '<span class="badge badge-inverse">' + biz.local_id() + '</span><br/>';

        // name/url
        text += '<a href="' + biz.url() + '" target="_blank">' + biz.name() + '</a><br/>';
        
        // stars
        text += '<img class="ratingsimage" src="' + biz.rating_img_url_small() + '"/><br/>';

        text += '<a href="' + biz.url() + '" target="_blank">Read the reviews »</a>';

        // stars
        /*text += '<img class="ratingsimage" src="' + biz.rating_img_url_small() + '"/>&nbsp;based&nbsp;on&nbsp;';
        */
        // reviews
        //text += biz.review_count() + '&nbsp;reviews<br/>';
        /*
        // categories
        text += 'Categories: ';
        $.each(biz.categories(), function(index, cat) {
            text += cat.name();
            if (index != biz.categories().length - 1) text += ', ';
        });
        text += '<br/>';

        // neighborhoods
        //if (biz.neighborhoods.length)
        //    text += formatNeighborhoods(biz.neighborhoods);
        // address
        */
        // address2
        /*if (biz.location().address()[0] !== undefined)
            text += biz.location().address()[0] + '<br/>';*/
            
        // city, state and zip
        //text += biz.location().city() + ',&nbsp;' + biz.location().state_code() + '&nbsp;' + biz.location().postal_code() + '<br/>';
        

        // city, state and zip
        //text += biz.location().city() + ',&nbsp;' + biz.location().state_code() + '&nbsp;<br/>';

        // phone number
        /*if (biz.phone() !== undefined)
            text += biz.formated_phone();
        // Read the reviews
        text += '<br/><a href="' + biz.url() + '" target="_blank">Read the reviews »</a><br/>';
        // div end
        text += '</div></div>';*/
        return text;
    };


    var initialize = function() {
        app.on('location:changed').then(onLocationChanged);
        app.on('businesses:loaded').then(onBusinessesChanged);
        var info = new google.maps.InfoWindow();
        infowindow(info);
    };

    var activate = function () {
        initialize();
        return true;

    };

    var vm = {
        activate: activate,
        map: map,
        setCentralMarker: setCentralMarker
        
    };
    return vm;

});

