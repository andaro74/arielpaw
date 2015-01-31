define(function () {

    var Business = function () {
        var self = this;

        self.id = ko.observable(),
        self.local_id = ko.observable(),
       self.phone = ko.observable(''),
        self.image_url = ko.observable('/Images/blank_biz_medium_sq.png'),
        self.rating_img_url_small = ko.observable(''),
        self.name = ko.observable(''),
        self.rating_img_url = ko.observable(''),
        self.url = ko.observable(''),
        self.review_count = ko.observable(0),
        self.is_closed = ko.observable(true),
        self.location = ko.observable(''),
        self.categories = ko.observableArray(),
        self.review_count_description = ko.computed(function () {
            return self.review_count() + " reviews.";
        });
        self.formated_phone = ko.computed(function () {
            var num = self.phone();
            if ((num === undefined) || (num.length != 10))
                return '';
            return '(' + num.slice(0, 3) + ') ' + num.slice(3, 6) + '-' + num.slice(6, 10);
        });
        self.display_name = ko.computed(function () {
            var result = self.name();
            if (self.name() !== undefined && self.name().length > 27) {
                result = self.name().substr(0, 24);
                result += "...";
            }

            return result;

        });
        //This flag shows whether the business has been selected at some point.
        self.isSelected = ko.observable(false);        


        self.display_address = ko.observableArray();
        self.address = ko.observableArray();
        self.postal_code = ko.observable('');
        self.city = ko.observable('');
        self.state_code = ko.observable('');
        self.lat = ko.observable(0);
        self.lng = ko.observable(0);
        self.neighborhoods = ko.observableArray();
        self.citystate = ko.computed(function () {
            var result = '';
            result += self.city() + ', ' + self.state_code();

            if (result.length > 35) {
                result = result.substr(0, 33);
                result += "...";
            }
            return result;
        });

        self.display_street = ko.computed(function () {
            var result = '';
            if ((self.display_address() !== undefined) && (self.display_address().length > 0))
                result = self.display_address()[0];
            return result;
        });

        self.categories = ko.observableArray();

        self.formated_address = ko.computed(function() {
            var result = self.display_street() + ', ' + self.city();
            return result;
        });
        
        self.chunked_address = ko.computed(function () {
            var result = self.display_street();
            if (result.length > 35) {
                result = result.substr(0, 33);
                result += "...";
            }
            return result;
        });

        self.reviews = ko.observableArray();

        return self;
    };


    var YelpReview = function () {
        var self = this;
        self.excerpt = ko.observable();
        self.id = ko.observable();
        self.rating = ko.observable();
        self.rating_image_large_url = ko.observable('');
        self.rating_image_small_url = ko.observable('');
        self.rating_image_url = ko.observable('');
        self.time_created = ko.observable();
        self.user = ko.observable();
        self.formated_date_created = ko.computed(function () {
            return moment.unix(self.time_created()).format('M/DD/YYYY');
        });

       
        return self;
    };

    var YelpUser = function () {
        var self = this;
       self.id = ko.observable();
       self.image_url = ko.observable();
       self.name = ko.observable();
        return self;

    };

    /* var place = function () {
        var self = this;
        self.Id = ko.observable(),
        self.UserId = ko.observable(),
        self.BusinessId = ko.observable(),
        self.PlanId = ko.observable(),
        self.StartDate = ko.observable(),
        self.EndDate = ko.observable();
    };
    
    var location = function () {
        var self = this;
        self.display_address = ko.observableArray(),
        self.address = ko.observableArray(),
        self.postal_code = ko.observable(),
        self.city = ko.observable(),
        self.state_code = ko.observable(),
        self.lat = ko.observable(),
        self.lng = ko.observable(),
        self.neighborhoods = ko.observableArray(),
        self.citystate = ko.computed(function () {
            var result = '';
            result += self.city() + ', ' + self.state_code();
            return result;
        });

        self.display_street = ko.computed(function () {
            var result = '';
            if ((self.display_address() !== undefined) && (self.display_address().length > 0))
                result = self.display_address()[0];
            return result;
        });
    };*/

   /* var category = function () {
        var self = this;
        self.name = ko.observable();
    };*/
    
    var vm = {
        Business: Business,
        YelpReview: YelpReview,
        YelpUser:YelpUser
        /*,
        place: place,
        location: location,
        category: category*/
        
    };

    return vm;
    
});
