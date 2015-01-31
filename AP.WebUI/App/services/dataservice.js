define(function(require) {
    var dataserviceplan = require('services/dataserviceplan'),
        dataserviceuser = require('services/dataserviceuser'),
        dataserviceactivity = require('services/dataserviceactivity'),
        dataserviceyelp = require('services/dataserviceyelp');

    return {
        dataserviceplan: dataserviceplan,
        dataserviceuser: dataserviceuser,
        dataserviceactivity: dataserviceactivity,
        dataserviceyelp: dataserviceyelp
        
    };
})
