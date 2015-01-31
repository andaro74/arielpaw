define(function (require) {
    var datacontext = require('services/datacontext'),
        router = require('plugins/router'),
        bindingHandlers = require('ko.bindingHandlers'),
        locationFilter = require('models/location.filter'),
        app = require('durandal/app'),
        model = require('models/andaro.model');

    var self = this;
    self.plan = ko.observable();
    self.isLocationOnEdit = ko.observable(false);
    
    var goBack = function () {
        router.navigateBack();
    };

    this.editLocation = function() {
        this.isLocationOnEdit(true);
    };
    
    this.endEditLocation = function () {
        this.isLocationOnEdit(false);
        app.trigger('location:changed', locationFilter);
    };


    var save = function () {

        var p = new model.Plan();
        p.Name(plan.Name);
      
        var defMethod = datacontext.Plans.Create;
        /* if (existingActivity != null) {
             activity.Id(existingActivity.Id());
             defMethod = datacontext.Activities.Update;
         }*/

        $.when(defMethod(p)).done(function (resultPlan) {
            //encodeURIComponent(queryString);
            var url = '#/searchplaces/' + resultPlan.Id();
            router.navigate(url);
        });

        return true;

    };
    

    var setInitialLocation = function (param) {
        //Trigger the publisher so everyone can listen this event.
        app.trigger('location:changed', locationFilter);
    };


   
    var activate = function() {
        var p = new model.Plan();
        p.Name(plan.Name);
       
        initialize();
    };

    var initialize = function() {
        this.isLocationOnEdit(false);
        setInitialLocation();
    };

    var vm = {
        activate: activate,
        title: 'Details View',
        goBack: goBack,
        plan: plan,
     
        save: save,
        locationFilter: locationFilter,
        isLocationOnEdit: isLocationOnEdit,
        editLocation: editLocation,
        endEditLocation: endEditLocation

    };


    return vm;


});