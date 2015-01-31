define(['durandal/system', 'durandal/app', 'plugins/router'],
    function (system, app, router ) {
        var self = this;
        self.token = $("input[name='__RequestVerificationToken']").val();
        self.plan = ko.observable();
        self.userIdentityName = ko.observable();
        self.isAuthenticated = ko.observable();
        self.isExternal = ko.observable();

        
        var isAuth= function(){
            if ($("#userIdentityName").val() == '')
                isAuthenticated(false);
            else
                isAuthenticated(true);
        }

        var isExt = function () {
            if ($("#externalSite").val() != 'true')
                isExternal(false);
            else
                isExternal(true);
        }
        
        var activate = function () {
            isAuth();
            isExt();
            return router.map([
                   { route: ['', 'default', '_=_'], moduleId: 'viewmodels/default', title: 'Home', nav: true },
                   { route: ['newplan'], moduleId: 'viewmodels/newplan', title: 'Create', nav: true },
                   { route: ['searchplaces/:id'], moduleId: 'viewmodels/searchplaces', title: 'Search', nav: false },
                   { route: ['plans'], moduleId: 'viewmodels/plans', title: 'Plans', nav: true },
                   { route: 'activityitem/:id', moduleId: 'viewmodels/activityitem', title: 'Activity'},
                   { route: 'planitem/:id', moduleId: 'viewmodels/planitem', title: 'Plan' },
                   { route: 'plandescription/:id', moduleId: 'viewmodels/plandescription', title: 'Description'}
                     
            ]).buildNavigationModel()
                   .mapUnknownRoutes('viewmodels/default', 'not-found')
                   .activate();

        };
            var shell = {
            activate: activate,
            router: router,
            token: $("input[name='__RequestVerificationToken']").val(), //mvc renders this on the main page as hidden item read it back off and store it
            userIdentityName: $("#userIdentityName").val(),
            isAuthenticathed: isAuthenticated,
            isExternal: isExternal
        };
        
        return shell;
});

