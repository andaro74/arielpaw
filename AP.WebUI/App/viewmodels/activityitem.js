define(function (require) {
    var datacontext = require('services/datacontext'),
        router = require('plugins/router'),
        app = require('durandal/app'),
        bindingHandlers = require('ko.bindingHandlers'),
        model = require('models/andaro.model'),
        locationFilter = require('models/location.filter');


    var business = ko.observable(),
        searchDate = ko.observable(new Date()),
        searchTime = ko.observable(moment(new Date()).startOf('hour').add("m", 60).format("hh:mm a")),
        selectedActivity = ko.observable(),
    plan = locationFilter.currentPlan;
    var searchDateTime = ko.computed(function () {
        var result = '';
        if ((!searchDate() && !searchTime()))
            return result;
        result = moment(searchDate()).format('MMMM D YYYY') + ', ' + searchTime();
        result = moment(result).format();
        return result;
    });


    var goBack = function () {

        router.navigateBack();
    };

    var addSubscriberEvents = function () {
        app.on('activity:save').then(save);
    };


   var saveActivity = function () {
        var activity = new model.Activity();
        activity.Id(0);
        activity.BusinessId(vm.business.id());
        activity.PlanId(vm.plan.Id());

        activity.StartDate(searchDateTime());
        activity.EndDate(searchDateTime());

        var existingActivity = ko.utils.arrayFirst(vm.plan.Activities(), function (item) {
            return ko.utils.stringStartsWith(item.BusinessId().toLowerCase(), activity.BusinessId());
        });

        var defMethod = datacontext.Activities.Create;
        if (existingActivity != null) {
            activity.Id(existingActivity.Id());
            defMethod = datacontext.Activities.Update;
        }

        selectedActivity = activity;
        $.when(defMethod(selectedActivity)).done(function () {
            
            var url = '#/planitem/' + vm.plan.Id();
            router.navigate(url);
           
        });
        return true;
    };


    var save = function() {


        if (!vm.plan) {
            return app.showDialog('viewmodels/plancreate').then(function(planresult) {
                if (!planresult)
                    return;
                else {
                    vm.plan(planresult);
                    saveActivity();
                }
            });
        } else {
            saveActivity();
        }

    };
    

    var saveNew = function () {
    return app.showDialog('viewmodels/plancreate').then(function (planresult) {
                if (!planresult)
                    return;
                else {
                    vm.plan(planresult);
                    saveActivity();
                }
            });
       

    };


    var activate = function (id, pinfo) {
        var data = {
            businessid: id,
            planid: pinfo.pinfo
        };
        addSubscriberEvents();
        datacontext.Plans.GetById(data.planid).done(function (result) {
            vm.plan = result;
            searchDate(vm.plan.StartFormatedDate());
            searchTime(vm.plan.StartFormatedTime());


            /*
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
            */

        });
        return datacontext.Yelp.GetBusiness(data.businessid).done(function (result) {
            vm.business = result;
        });

    };



    var vm = {
        activate: activate,
        title: 'Details View',
        business: business,
        goBack: goBack,
        searchDate: searchDate,
        //timeOptions: { minuteStep: 15, defaultTime: 'current', showSeconds: false, showMeridian: true, template: 'dropdown', showInputs: true },
        timeOptions: { minuteStep: 15, defaultTime: 'current', showSeconds: false, showMeridian: true, template: 'modal', showInputs: true, appendWidgetTo:'body' },
        dateOptions: { dateFormat: 'DD, d MM, yy', changeMonth: true, changeYear: true, minDate: new Date(), altField: '#alternate', altFormat: 'DD, d MM, yy' },
        searchTime: searchTime,
        plan: plan,
        save: save,
        saveNew: saveNew
    };


    return vm;


});