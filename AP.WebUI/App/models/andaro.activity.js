define(function (require) {
    

    var Activity = function () {
        var self = this;
        self.Id = ko.observable(),
        self.UserId = ko.observable(),
        self.BusinessId = ko.observable(),
        self.PlanId = ko.observable(),
        self.StartDate = ko.observable(),
        self.EndDate = ko.observable(),
        self.StartTime = ko.observable(),
        self.EndTime = ko.observable(),
        
        self.StartFormatedDate = ko.observable(),
         self.StartFormatedTime = ko.observable(),
        
         self.StartDisplayDate = ko.observable(),
        
         self.DisplayDay = ko.observable(),
        self.DisplayMonth = ko.observable(),
        self.DisplayYear = ko.observable(),
        self.DisplayDayOfWeek = ko.observable(),
        
        
        self.dirtyFlag = new ko.DirtyFlag([self.Name]),
        self.Detail = ko.observable();
        
        return self;
    };

    Activity.Nullo = new Activity()
        .Id(0)
        .UserId(0)
        .BusinessId(0)
        .PlanId(0);

    Activity.Nullo.isNullo = true;
    Activity.Nullo.isBrief = function () {
        return false;
    };
    Activity.Nullo.dirtyFlag().reset();

    /*var _dc = null;
    Activity.datacontext = function (dc) {
        if (dc) {
            _dc = dc;
        }
        return _dc;
    };*/

    return Activity;
})