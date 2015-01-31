define(function (require) {


  var Plan = function() {
      var self = this;
      self.local_id = ko.observable(), //Local id to show
      self.Id = ko.observable(),
      self.Name = ko.observable().extend({
          required: { message: "* Please supply a name" }
      }),
     

      self.UserId = ko.observable(), //.extend({ required: true }),
      self.Description = ko.observable(),
      self.CreatedDate=ko.observable(),
      self.dirtyFlag = new ko.DirtyFlag([self.Name]),
      self.InitialLocation = ko.observable(),
      
      self.StartDate = ko.observable(),
      self.Lat = ko.observable(),
      self.Lng = ko.observable(),
      self.StartFormatedDate = ko.observable(),
      self.StartFormatedTime = ko.observable(),
      self.SelectedLocationName=ko.observable(),

      self.Activities = ko.observableArray();

     

      self.Errors = ko.validation.group(this, { deep: true });

     
      return self;
  };

 

    Plan.Nullo = new Plan()
        .Id(0)
        .Name('My default Plan')
        .UserId(0);

    Plan.Nullo.isNullo = true;
    Plan.Nullo.isBrief = function() {
        return false;
    };

    Plan.Nullo.dirtyFlag().reset();

    var _dc = null;
    Plan.datacontext = function(dc) {
        if (dc) {
            _dc = dc;
        }
        return _dc;
    };   
    
    return Plan;
    
})