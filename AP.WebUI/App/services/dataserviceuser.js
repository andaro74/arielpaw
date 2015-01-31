define(function () {

    var init = function () {

        amplify.request.define('currentuser', 'ajax', {
            url: '/api/users/current',
            dataType: 'json',
            type: 'GET'
        });
    },
        getcurrentuser = function (callbacks) {
            return amplify.request({
                resourceId: 'currentuser',
                success: callbacks.success,
                error: callbacks.error
            });
        };

    init();

    return {
        getcurrentuser: getcurrentuser
    };
});