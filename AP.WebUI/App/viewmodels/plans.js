
define(function (require) {
    var datacontext = require('services/datacontext'),
        router = require('plugins/router'),
        app = require('durandal/app'),
        locationFilter = require('models/location.filter');
      
   
    var self = this;
        self.plans = ko.observableArray();

   

    var goBack = function () {
        router.navigateBack();
    };

    var addNewPlan = function () {

        var url = '#/planaddedit';
        router.navigate(url);

    };


    var viewPlan = function (plan) {

        var url = '#/planitem/' + plan.Id();
        router.navigate(url);
        
    };


    var hidePlanItemElement = function(elem) {
        if (elem.nodeType === 1)
            $(elem).slideUp(function() {
                $(elem).remove();
            });
    };


    var removePlan = function (plan) {
        return app.showMessage('Are you sure you want to delete the plan?', 'Confirmation', ['Yes', 'No']).then(function(confirmationResult) {
            if (confirmationResult == 'Yes') {
                return datacontext.Plans.Delete(plan.Id()).done(function (result) {
                    vm.plans.remove(plan);
                });
            } else {
                return true;
            }
        });
    };
    
    var addActivities = function (plan) {
        locationFilter.currentPlan(plan);
        var url = '#/searchplaces';
        router.navigate(url);
    };

    


    var activate = function () {
        return datacontext.Plans.Get().done(function (result) {
            vm.plans(result);
        });
    };

    var vm = {
        activate: activate,
        goBack: goBack,
        viewPlan: viewPlan,
        addNewPlan: addNewPlan,
        removePlan: removePlan,
        addActivities:addActivities,
        plans: plans,
        hidePlanItemElement: hidePlanItemElement
        
        
    };
    
    return vm;
});
