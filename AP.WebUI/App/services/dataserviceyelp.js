define(function (require) {

    var config = require('config');

    var
    getBusinesses = function (callbacks, data) {

        var yelpLocation;
        if (data && data.lat !== undefined && data.lng !== undefined)
            yelpLocation = '' + data.lat + ',' + data.lng + '';
        else
            yelpLocation = '' + config.initialLocaiton.lat + ',' + config.initialLocaiton.lng + '';

        var parameters = [];
        if (data && data.terms) 
            parameters.push(['term',  data.terms]);
        
        parameters.push(['radius_filter', (data && data.radius_filter) ? data.radius_filter : config.yelpInitialValues.radius_filter]);
        parameters.push(['sort', (data && data.sort) ? data.sort : config.yelpInitialValues.sort]);
        parameters.push(['ll', yelpLocation]);
        parameters.push(['callback', 'cb']);
        parameters.push(['oauth_consumer_key', config.yelpCredentials.consumerKey]);
        parameters.push(['oauth_consumer_secret', config.yelpCredentials.consumerSecret]);
        parameters.push(['oauth_token', config.yelpCredentials.accessToken]);
        parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

        var message = {
            'action': 'http://api.yelp.com/v2/search',
            'method': 'GET',
            'parameters': parameters
        };

        OAuth.setTimestampAndNonce(message);
        OAuth.SignatureMethod.sign(message, config.yelpCredentials.accessor);

        var parameterMap = OAuth.getParameterMap(message.parameters);
        parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);

        //Retrieve data from the server
        return $.ajax({
            'url': message.action,
            'data': parameterMap,
            'cache': true,
            'contentType': "application/json; charset=utf-8",
            'dataType': 'jsonp',
            'success': callbacks.success,
            'error': callbacks.error,
            'jsonpCallback': 'cb'
        });

    };
    var getBusiness = function (callbacks, id) {

        var URI = 'http://api.yelp.com/v2/business/' + id;
      
       
        var parameters = [];
         parameters.push(['callback', 'cb']);
        parameters.push(['oauth_consumer_key', config.yelpCredentials.consumerKey]);
        parameters.push(['oauth_consumer_secret', config.yelpCredentials.consumerSecret]);
        parameters.push(['oauth_token', config.yelpCredentials.accessToken]);
        parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

        var message = {
            'action': URI,
            'method': 'GET',
            'parameters': parameters
        };

        OAuth.setTimestampAndNonce(message);
        OAuth.SignatureMethod.sign(message, config.yelpCredentials.accessor);

        var parameterMap = OAuth.getParameterMap(message.parameters);
        parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);




        //Retrieve data from the server
        return $.ajax({
            'url':message.action,
            'data': parameterMap,
            'cache': true,
            'contentType': "application/json; charset=utf-8",
            'dataType': 'jsonp',
            'success': callbacks.success,
            'error': callbacks.error,
            'jsonpCallback': 'cb'
        });

    };

    return {
        getBusinesses: getBusinesses,
        getBusiness: getBusiness
    };
});