define(function(require) {

    var UserProfile = function() {
        var self = this;
        self.UserId = ko.observable(),
        self.UserName = ko.observable();
        return self;
    };

    UserProfile.Nullo = new UserProfile()
        .UserId(0)
        .UserName('Default User');
       
    UserProfile.Nullo.isNullo = true;

    return UserProfile;
    

    /* var self = this;
        self.UserId = ko.observable(),
        self.UserName = ko.observable();

    return { UserId: UserId, UserName: UserName };    
    */

});