define(function () {
    var init = function() {
        amplify.request.define('activityGet', 'ajax', {
            url: '/api/activities/default/{id}',
            dataType: 'json',
            type: 'GET'
        });
        amplify.request.define('activityCreate', 'ajax', {
            url: '/api/activities/default',
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json;charset=utf-8'
        });
        amplify.request.define('activityUpdate', 'ajax', {
            url: '/api/activities/default',
            dataType: "json",
            type: "PUT",
            contentType: "application/json; charset=utf-8",
            dataMap: function(data) {
                return JSON.stringify(data);
            }
        });

        amplify.request.define('activityDelete', 'ajax', {
            url: '/api/activities/default/{id}',
            dataType: 'json',
            type: 'DELETE'
        });

        amplify.request.define('activitiesbyplan', 'ajax', {
            url: '/api/activities/plan/{planid}',
            dataType: 'json',
            type: 'GET'
        });

    },
        getactivity = function(callbacks, id) {
            return amplify.request({
                resourceId: 'activityGet',
                data: { id: id },
                success: callbacks.success,
                error: callbacks.error
            }, id);
        },
        activityCreate = function(callbacks, data) {
            return amplify.request(
                'activityCreate',
                data,
                callbacks.success,
                callbacks.error
            );
        },
        activityUpdate = function(callbacks, data) {
            return amplify.request(
                'activityUpdate',
                data,
                callbacks.success,
                callbacks.error
            );
        },
        activityDelete = function(callbacks, id) {
            return amplify.request({
                resourceId: 'activityDelete',
                data: { id: id },
                success: callbacks.success,
                error: callbacks.error
            }, id);
        },
        getactivitiesbyplanid = function (callbacks, planid) {
            return amplify.request({
                resourceId: 'activitiesbyplan',
                data: { planid: planid },
                success: callbacks.success,
                error: callbacks.error
            }, planid);
        };

    init();

    return {
        getactivity: getactivity,
        activityCreate:activityCreate,
        activityUpdate: activityUpdate,
        activityDelete: activityDelete,
        getactivitiesbyplanid: getactivitiesbyplanid
    };

});