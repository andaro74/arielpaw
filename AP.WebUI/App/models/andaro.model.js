define(function (require) {
    var Plan = require('models/andaro.plan'),
        UserProfile = require('models/andaro.userprofile'),
        Activity = require('models/andaro.activity'),
        Yelp = require('models/yelp');

    var
           model = {
               Plan: Plan,
               UserProfile: UserProfile,
               Activity: Activity,
               Yelp:Yelp
           };
    
    model.setDataContext = function (dc) {
        // Model's that have navigation properties 
        // need a reference to the datacontext.
        model.Plan.datacontext(dc);
    };
    return model;


});