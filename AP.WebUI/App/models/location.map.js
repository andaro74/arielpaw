define(function(require) {
    var self = this;
    self.map = ko.observable(),
    self.centralmarker = ko.observable(),
    self.markers = ko.observableArray(),
    self.infowindow = ko.observable(),
    self.mapvisible = ko.observable(false),
    self.mapText = ko.observable('Show Map');
  

    var showHideMapContainer = function () {
        var visibility = self.mapvisible();

        if (visibility == true) {
            self.mapText('Show Map');
            self.mapvisible(false);
        } else {
            self.mapText('Hide Map');
            self.mapvisible(true);
        }
    };


    var vm = {
        map: map,
        centralmarker: centralmarker,
        markers: markers,
        infowindow: infowindow,
        mapvisible: mapvisible,
        mapText: mapText,
        showHideMapContainer: showHideMapContainer,
        mapOptions: { minuteStep: 15, defaultTime: 'current', showSeconds: false, showMeridian: true, template: 'dropdown', showInputs: true }
       
    };

    return vm;
});