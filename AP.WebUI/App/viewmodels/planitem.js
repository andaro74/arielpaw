define(function (require) {
    var datacontext = require('services/datacontext'),
        router = require('plugins/router'),
        bindingHandlers = require('ko.bindingHandlers'),
        locationmap = require('models/location.map'),
        app = require('durandal/app'),
        locationFilter = require('models/location.filter'),
        facebook=require('facebook');

    var plan = locationFilter.currentPlan;
    
    var goBack = function () {
        router.navigateBack();
    };    
    


var removeActivity = function(delactivity) {
    return app.showMessage('Are you sure you want to remote this activity?', 'Confirmation', ['Yes', 'No']).then(function(confirmationResult) {
        if (confirmationResult == 'Yes') {
            return datacontext.Activities.Delete(delactivity.Id()).then(function() {
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
            $(elem).slideUp("slow",function () {
                $(elem).remove();
            });
    };

    var shareFacebook = function () {
        var url = 'http://www.arielpaw.com';
        var redirect_uri= 'http://www.arielpaw.com/external/#/plandescription/' + vm.plan().Id();
        FB.ui({
            method: 'send',
            link: redirect_uri

        }, function (response) { });
    };


    var GetYelpBusiness = function (activities, index) {

        if (activities.length==0)
            return;

        var item = activities[index];
        var businessId = item.BusinessId();
        datacontext.Yelp.GetBusiness(businessId).done(function (yelpbusiness) {
            item.Detail(yelpbusiness);

            if (index < activities.length - 1)
            {
                index++;
                GetYelpBusiness(activities, index);
            }

        });
    };
    
    
    var activate = function (id) {
        return datacontext.Plans.GetById(id).done(function (result) {
            vm.plan(result);
            var activities = vm.plan().Activities();
            var len = activities.length;
            var index = 0;
            GetYelpBusiness(activities, index);
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
        hidePlanItemElement: hidePlanItemElement,
        shareFacebook: shareFacebook
        
    };


    return vm;


});