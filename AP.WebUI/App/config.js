define(function () {
   
    var startModule = 'home';
    var throttle = 0;

    var yelpCredentials = {
        consumerKey: "gyi2ODBQVlQcje_SNWE4Pg",
        consumerSecret: "5FIDOFLMCNogSAkDTuHfJ7m0wmw",
        accessToken: "CD7IqeXtZLNvnVkzeEHeXgMCCUrUoEEM",
        accessor: {
            consumerSecret: "5FIDOFLMCNogSAkDTuHfJ7m0wmw",
            tokenSecret: "acdsFFqnzh0HCM_eJ0rppnAXTSM"
        }
    };

    var yelpInitialValues = {
        terms: 'food',
        radius_filter: '1000',
        sort:'0' //Default 
        
    };

    var initialLocation = {
        lat: 34.022075,
        lng: -118.490982
    };


    return {
        //routes: routes,
        startModule: startModule,
        throttle: throttle,
        yelpCredentials: yelpCredentials,
        yelpInitialValues: yelpInitialValues,
        initialLocation: initialLocation
    };


});