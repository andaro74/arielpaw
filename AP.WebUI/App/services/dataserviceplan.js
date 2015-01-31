define(function() {

    var init = function() {

        amplify.request.define('plans', 'ajax', {
            url: '/api/plans/default',
            dataType: 'json',
            type: 'GET'
        });
        amplify.request.define('plan', 'ajax', {
            url: '/api/plans/default/{id}',
            dataType: 'json',
            type: 'GET'
        });
        amplify.request.define('planCreate', 'ajax', {
            url: '/api/plans/default',
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json;charset=utf-8'
        });
        amplify.request.define('planUpdate', 'ajax', {
            url: '/api/plans/default',
            dataType: "json",
            type: "PUT",
            contentType: "application/json; charset=utf-8",
            dataMap: function(data) {
                return JSON.stringify(data);
            }
        });

        amplify.request.define('usersplans', 'ajax', {
            url: '/api/plans/users/{id}',
            dataType: 'json',
            type: 'GET'
        });

       

        amplify.request.define('planDelete', 'ajax', {
            url: '/api/plans/default/{id}',
            dataType: 'json',
            type: 'DELETE'
        });

        amplify.request.define('latestplan', 'ajax', {
            url: '/api/plans/latest',
            dataType: 'json',
            type: 'GET'
        });
    },
        getplans = function(callbacks) {
            return amplify.request({
                resourceId: 'plans',
                success: callbacks.success,
                error: callbacks.error
            });
        },
        getplan = function(callbacks, id) {
            return amplify.request({
                resourceId: 'plan',
                data: { id: id },
                success: callbacks.success,
                error: callbacks.error
            }, id);
        },
        getplansbyuserid = function(callbacks, id) {
            return amplify.request({
                resourceId: 'usersplans',
                data: { id: id },
                success: callbacks.success,
                error: callbacks.error
            }, id);
        },
       
        addPlan = function(callbacks, data) {
            return amplify.request(
                'planCreate',
                data,
                callbacks.success,
                callbacks.error
            );
        },
        deletePlan = function(callbacks, id) {
            return amplify.request({
                resourceId: 'planDelete',
                data: { id: id },
                success: callbacks.success,
                error: callbacks.error
            }, id);
        },
        updatePlan = function(callbacks, data) {
            return amplify.request(
                'planUpdate',
                data,
                callbacks.success,
                callbacks.error
            );
        },
        getlatestplan = function(callbacks) {
            return amplify.request({
                resourceId: 'latestplan',
                success: callbacks.success,
                error: callbacks.error
            });
        };

    init();

    return {
        getplans: getplans,
        getplan: getplan,
        getplansbyuserid: getplansbyuserid,
        addPlan: addPlan,
        updatePlan: updatePlan,
        deletePlan: deletePlan,
        getlatestplan: getlatestplan
    };

});