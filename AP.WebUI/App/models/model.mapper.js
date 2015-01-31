define(function (require) {
    var model = require('models/andaro.model');
    
        var plan = {
            getDtoId: function(dto) {
                return model.Plan.Id(dto.Id);
            },
            fromDto: function(dto) {
                var item = new model.Plan().Id(dto.Id);
                item.Name(dto.Name);
                item.Description(dto.Description);
                item.StartDate(dto.StartDate);
                item.Lat(dto.Lat);
                item.Lng(dto.Lng);
                item.SelectedLocationName(dto.SelectedLocationName);

                var fDate = moment(dto.StartDate).toDate();
                item.StartFormatedDate(fDate);

                var fTime = moment(dto.StartDate).format("h:mm A");
                item.StartFormatedTime(fTime);


                item.dirtyFlag().reset();
                return item;
            }
        };

        var activity = {
            getDtoId: function (dto) {
                return model.activity.Id(dto.Id);
            },
            fromDto: function (dto) {
                var item = new model.Activity().Id(dto.Id);
                item.UserId(dto.UserId);
                item.BusinessId(dto.BusinessId);
                item.PlanId(dto.PlanId);
                item.StartDate(dto.StartDate);
                item.EndDate(dto.EndDate);

                var fDate = moment(dto.StartDate).toDate();
                item.StartFormatedDate(fDate);

                var fTime = moment(dto.StartDate).format("h:mm A");
                item.StartFormatedTime(fTime);

                var dDateTime = moment(dto.StartDate).format('MMMM Do YYYY');
                item.StartDisplayDate(dDateTime);


                item.DisplayDay(moment(dto.StartDate).format('D'));
                item.DisplayMonth(moment(dto.StartDate).format('MMM'));
                item.DisplayYear(moment(dto.StartDate).format('YYYY'));
                item.DisplayDayOfWeek(moment(dto.StartDate).format('dddd'));

                item.dirtyFlag().reset();
                return item;
            }
        };
   
        var activities = {
            fromDtos: function (dtos) {
                var lstActivities = new Array();

                $.each(dtos, function(i, val) {
                    var item = activity.fromDto(val);
                    lstActivities.push(item);
                });
                return lstActivities;
            }
        };
    
        var yelpbusiness = {
            getDtoId: function (dto) {
                return model.yelp.id(dto.id);
            },
            fromDto: function (item) {
                
                var business = new model.Yelp.Business();
                //business.local_id(++index);
                business.phone(item.phone);
                business.id(item.id);
                business.image_url(item.image_url);
                business.name(item.name);
                business.rating_img_url(item.rating_img_url);
                business.rating_img_url_small(item.rating_img_url_small);
                business.url(item.url);
                business.review_count(item.review_count);
                business.is_closed(item.is_closed);

                /*if (item.categories !== undefined) {
                    $.each(item.categories, function (i, cat) {
                        var catego = new yelpmodel.category().name(cat[0]);
                        business.categories.push(catego);
                    });
                }*/

                business.categories(item.categories);
                business.display_address(item.location.display_address);
                business.address(item.location.address);
                business.neighborhoods(item.location.neighborhoods);
                business.lat(item.location.coordinate.latitude);
                business.lng(item.location.coordinate.longitude);
                
                /*$.each(local.address, function (iaddress, itemaddress) {
                    local.address.push(itemaddress);
                });*/

               /* if (local.neighborhoods !== undefined) {
                    $.each(local.neighborhoods, function (ineigh, itemneigh) {
                        local.neighborhoods.push(itemneigh);
                    });
                }*/
                business.postal_code(item.location.postal_code);
                business.city(item.location.city);
                business.state_code(item.location.state_code);

                //Load the reviews if any
                if (item.reviews) {
                    var reviews = new Array();
                    ko.utils.arrayForEach(item.reviews, function(rev) {
                        var review = new model.Yelp.YelpReview();
                        review.rating_image_small_url(rev.rating_image_small_url);
                        review.rating_image_url(rev.rating_image_url);
                        review.excerpt(rev.excerpt);
                        review.time_created(rev.time_created);

                        //Load the information of the user
                        if (rev.user) {
                            var itemuser = rev.user;
                            var u = new model.Yelp.YelpUser();
                            u.id(itemuser.id);
                            u.image_url(itemuser.image_url);
                            u.name(itemuser.name);
                            review.user(u);
                        }


                        reviews.push(review);
                    });
                    if (reviews.length > 0)
                        business.reviews(reviews);
                }

                return business;
            }
        };
    
        var yelpbusinesses = {
            fromDtos: function (dtos) {
                var lstBusiness = new Array();

                $.each(dtos.businesses, function (index, val) {
                    var item = yelpbusiness.fromDto(val);
                    item.local_id(++index);
                    lstBusiness.push(item);
                });
                return lstBusiness;
            }
        };


        return {
            plan: plan,
            activities: activities,
            activity: activity,
            yelpbusiness: yelpbusiness,
            yelpbusinesses: yelpbusinesses
        };
    });
