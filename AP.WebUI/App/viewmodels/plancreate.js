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
        

    var cancel = function () {
       this.__dialog__.close();
    };


    var save = function () {
        
        var defMethod = datacontext.Plans.Create;
       /* if (existingActivity != null) {
            activity.Id(existingActivity.Id());
            defMethod = datacontext.Activities.Update;
        }*/

        $.when(defMethod(vm.plan)).done(function (resultPlan) {
            //Close the dialog and return a result
            vm.__dialog__.close(resultPlan);
        });
        
       
    };

    var activate = function () {

        var p = new model.Plan();
        p.Name();
        p.Description();  
        vm.plan=p;
        return vm.plan;
    };


    var vm = {
        activate: activate,
        cancel: cancel,
        plan: plan,
        save: save,
        isSelected: isSelected,
        message: message,
        title:title
    };


    return vm;


});