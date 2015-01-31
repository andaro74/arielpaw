define(function (require) {
    var datacontext = require('services/datacontext'),
        router = require('plugins/router'),
        bindingHandlers = require('ko.bindingHandlers'),
        locationmap = require('models/location.map'),
        app = require('durandal/app'),
    locationFilter = require('models/location.filter');

    var plan = locationFilter.currentPlan;

    var goBack = function () {
        router.navigateBack();
    };



    var removeActivity = function (delactivity) {
        return app.showMessage('Are you sure you want to remote this activity?', 'Confirmation', ['Yes', 'No']).then(function (confirmationResult) {
            if (confirmationResult == 'Yes') {
                return datacontext.Activities.Delete(delactivity.Id()).then(function () {
                    vm.plan().Activities.remove(delactivity);
                });
            }
        });
    };


    var modifyActivity = function (selectedBusiness) {
        if (selectedBusiness && selectedBusiness.BusinessId()) {

            var url = '#/activityitem/' + selectedBusiness.BusinessId() + '/plan/' + selectedBusiness.PlanId();
            router.navigate(url, { replace: true });
        }
    };

    var addActivities = function () {

        var url = '#/searchplaces/' + vm.plan().Id();
        router.navigate(url);
    };


    var hidePlanItemElement = function (elem) {
        if (elem.nodeType === 1)
            $(elem).slideUp("slow", function () {
                $(elem).remove();
            });
    };


    var activate = function (id) {
        return datacontext.Plans.GetWithBusinessesByPlanId(id).done(function (result) {
            vm.plan(result);

        });
    };

    var vm = {
        activate: activate,
        title: 'Details View',
        goBack: goBack,
        timeOptions: { minuteStep: 15, defaultTime: 'current', showSeconds: false, showMeridian: true, template: 'dropdown', showInputs: true },
        dateOptions: { dateFormat: 'DD, d MM, yy', changeMonth: true, changeYear: true, altField: '#alternate', altFormat: 'DD, d MM, yy' },
        plan: plan,
        removeActivity: removeActivity,
        modifyActivity: modifyActivity,
        addActivities: addActivities,
        locationmap: locationmap,
        hidePlanItemElement: hidePlanItemElement

    };


    return vm;


});