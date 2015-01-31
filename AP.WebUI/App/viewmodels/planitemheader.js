
define(function (require) {
    var logger = require('services/logger'),
        config = require('config'),
        locationFilter = require('models/location.filter'),
        bindingHandlers = require('ko.bindingHandlers'),
        router = require('plugins/router'),
        locationmap = require('models/location.map'),
        plan = require('models/andaro.plan'),
        app = require('durandal/app');

        var self = this;
        self.searchDate = ko.observable(),
        self.searchTime = ko.observable(),
        self.dateOptions = { dateFormat: 'DD, d MM, yy', changeMonth: true, changeYear: true, minDate: new Date() },
        self.timeOptions = { minuteStep: 15, defaultTime: 'current', showSeconds: false, showMeridian: true, template: 'dropdown', showInputs: true },
    
        self.map = locationmap.map,
            self.mapvisible = locationmap.mapvisible,
            self.mapText = locationmap.mapText,
            self.showHideMapContainer = locationmap.showHideMapContainer,

            self.mapvisible(false),
            self.mapText('Show Map');
    
        var goBack = function () {
            router.navigateBack();
        };


        var save = function () {
            app.trigger('activity:save');
    };

    var initialize = function () {
            var iniDate = new Date();
            searchDate(iniDate);
            
            
         

        };


        function activate() {
            initialize();
            return true;
        }

        var vm = {
            activate: activate,
            searchDate: searchDate,
            timeOptions: timeOptions,
            searchTime: searchTime,
            goBack: goBack,
            mapvisible: mapvisible,
            mapText: mapText,
            showHideMapContainer: showHideMapContainer,
            map: map,
            plan: plan,
            save: save
        };
        return vm;


    });