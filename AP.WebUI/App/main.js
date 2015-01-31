require.config({
    shim: {
        'facebook': {
            exports: 'FB'
        }
    },
    paths: {
        'text': '../Scripts/text',
        'durandal': '../Scripts/durandal',
        'plugins': '../Scripts/durandal/plugins',
        'transitions': '../Scripts/durandal/transitions',
        'facebook': '//connect.facebook.net/en_US/all'
    },
   
});

require(['fb']);

//Define jquery and knockout. This has to be loaded in the main page in order to work
define('jquery', [], function () { return jQuery; });
define('knockout', [], function () { return ko; });


define(['durandal/app', 'durandal/viewLocator', 'durandal/system', 'facebook'],
    function (app, viewLocator, system, facebook) {

    // Enable debug message to show in the console 
        system.debug(true);
        
        app.title = 'ArielPaw';

        FB.init({
            appId: '329761607170995' //Prod
            //appId: '336308703182952' //Dev
            
        });

        //specify which plugins to install and their configuration
        app.configurePlugins({
            router: true,
            dialog: true
        });

    app.start().then(function () {
      

        /*router.handleInvalidRoute = function (route, params) {
            logger.logError('No Route Found', route, 'main', true);
        };
        */
        // When finding a viewmodel module, replace the viewmodel string 
        // with view to find it partner view.
        //router.useConvention();
        
        viewLocator.useConvention();
        
   
        //Show the app by setting the root view model for our application.
        app.setRoot('viewmodels/shell', 'entrance');
        //app.setRoot('shell');

      /*  router.guardRoute = function (routeInfo, params, instance) {
            logger.logError('guardRoute called', routeInfo, 'main', true);
            //return false;
        };*/

    });
});