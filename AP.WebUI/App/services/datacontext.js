define(function (require) {

    var config = require('config'),
        dataservice = require('services/dataservice'),
        model = require('models/andaro.model'),
        mapper = require('models/model.mapper');
       


    var Plans = Plans || {};
    var UserProfiles = UserProfiles || {};
    var Activities = Activities || {};
    var Yelp = Yelp || {};


    UserProfiles.getCurrentUser = function(callbacks) {
        return $.Deferred(function(def) {
            // if nullo or brief, get fresh from database
            dataservice.dataserviceuser.getcurrentuser({
                success: function(dto) {
                    var userProfile = new model.UserProfile();
                    userProfile.UserId(dto.UserId);
                    userProfile.Name(dto.UserName);

                    if (callbacks && callbacks.success) {
                        callbacks.success(userProfile);
                    }

                    def.resolve(userProfile);
                },
                error: function(response) {
                    if (callbacks && callbacks.error) {
                        callbacks.error(response);
                    }
                    def.reject(response);
                }
            });
        }).promise();
    };

    Plans.Create = function(planModel, callbacks) {
        var planModelJson = ko.toJSON(planModel);
        return $.Deferred(function(def) {
            dataservice.dataserviceplan.addPlan({
                success: function(dto) {
                    if (!dto) {
                        if (callbacks && callbacks.error) {
                            callbacks.error();
                        }
                        def.reject();
                        return;
                    }

                    planModel = mapper.plan.fromDto(dto, planModel);
                    if (callbacks && callbacks.success) {
                        callbacks.success(planModel);
                    }
                    def.resolve(planModel);

                },
                error: function(response) {
                    if (callbacks && callbacks.error) {
                        callbacks.error();
                    }
                    def.reject(response);
                    return;
                }
            }, planModelJson);
        }).promise();

    };
    

    Plans.Delete = function (planId, callbacks) {

        return $.Deferred(function (def) {
            dataservice.dataserviceplan.deletePlan({
                success: function () {
                    if (callbacks && callbacks.success) { callbacks.success(); }
                    def.resolve();
                },
                error: function (response) {
                    if (callbacks && callbacks.error) { callbacks.error(); }
                    def.reject(response);
                    return;
                }
            }, planId);
        }).promise();

    };



    /*
    Plans.Get = function(callbacks) {

        return $.Deferred(function(def) {
            dataservice.dataserviceplan.getplans({
                success: function(dtos) {
                    if (!dtos) {
                        if (callbacks && callbacks.error) {
                            callbacks.error();
                        }
                        def.reject();
                        return;
                    }

                    var plans = new Array();
                    var plansCount = dtos.length;
                    var i = 1;

                    if (dtos.length === 0) {
                        def.resolve(plans);
                    };

                    ko.utils.arrayForEach(dtos, function(dto) {
                        var planModel = mapper.plan.fromDto(dto);
                        planModel.local_id(i++); //Local variable to show the number of plans.
                       
                        //If getting Yelp data
                        if (dto.Activities.length > 0) {
                            var listActivities = mapper.activities.fromDtos(dto.Activities);

                            ko.utils.arrayForEach(listActivities, function (item) {
                                var businessId = item.BusinessId();

                                datacontext.Yelp.GetBusiness(businessId).done(function (yelpbusiness) {
                                    item.Detail(yelpbusiness);
                                    //Check whether all the activities from yelp have been retrieved.
                                    var emptyActivityDetail = ko.utils.arrayFirst(listActivities, function (filterItem) {
                                        return filterItem.Detail() === undefined;
                                    });
                                    if (!emptyActivityDetail) {
                                        planModel.Activities(listActivities);
                                        /* if (callbacks && callbacks.success) {
                                             callbacks.success(planModel);
                                         }
                                         def.resolve(planModel);*//*

                                        plans.push(planModel);

                                        if (plans.length === plansCount) {
                                            if (callbacks && callbacks.success) {
                                                callbacks.success(plans);
                                            }
                                            def.resolve(plans);

                                        }
                                    }


                                });


                            });

                        }
                        else {

                            plans.push(planModel);

                            if (plans.length === plansCount) {
                                if (callbacks && callbacks.success) {
                                    callbacks.success(plans);
                                }
                                def.resolve(plans);

                            }
                        }


                        
                    });

                },
                error: function(response) {
                    if (callbacks && callbacks.error) {
                        callbacks.error();
                    }
                    def.reject(response);
                    return;
                }
            });
        }).promise();

    };
        */


    Plans.Get = function (callbacks) {

        return $.Deferred(function (def) {
            dataservice.dataserviceplan.getplans({
                success: function (dtos) {
                    if (!dtos) {
                        if (callbacks && callbacks.error) {
                            callbacks.error();
                        }
                        def.reject();
                        return;
                    }

                    var plans = new Array();
                    var plansCount = dtos.length;
                    var i = 1;

                    if (dtos.length === 0) {
                        def.resolve(plans);
                    };

                    ko.utils.arrayForEach(dtos, function (dto) {
                        var planModel = mapper.plan.fromDto(dto);
                        planModel.local_id(i++); //Local variable to show the number of plans.

                        //If getting Yelp data
                        if (dto.Activities.length > 0) {
                            var listActivities = mapper.activities.fromDtos(dto.Activities);

                            planModel.Activities(listActivities);
                            

                         /*   ko.utils.arrayForEach(listActivities, function (item) {
                                var businessId = item.BusinessId();

                                datacontext.Yelp.GetBusiness(businessId).done(function (yelpbusiness) {
                                    item.Detail(yelpbusiness);
                                    //Check whether all the activities from yelp have been retrieved.
                                    var emptyActivityDetail = ko.utils.arrayFirst(listActivities, function (filterItem) {
                                        return filterItem.Detail() === undefined;
                                    });
                                    if (!emptyActivityDetail) {
                                        planModel.Activities(listActivities);
                                        

                                        plans.push(planModel);

                                        if (plans.length === plansCount) {
                                            if (callbacks && callbacks.success) {
                                                callbacks.success(plans);
                                            }
                                            def.resolve(plans);

                                        }
                                    }


                                });


                            });*/

                        }

                        plans.push(planModel);
                    });
                    

                    if (callbacks && callbacks.success) {
                        callbacks.success(plans);
                    }
                    def.resolve(plans);

                },
                error: function (response) {
                    if (callbacks && callbacks.error) {
                        callbacks.error();
                    }
                    def.reject(response);
                    return;
                }
            });
        }).promise();

    };

    
    Plans.Current = function (planModel, callbacks) {
       
        return $.Deferred(function (def) {
            dataservice.dataserviceplan.getlatestplan({
                success: function (dto) {
                    if (!dto) {
                        if (callbacks && callbacks.error) {
                            callbacks.error();
                        }
                        def.reject();
                        return;
                    }
                    
                    planModel = mapper.plan.fromDto(dto);
                    if (callbacks && callbacks.success) { callbacks.success(planModel); }
                    def.resolve(planModel);

                },
                error: function (response) {
                    if (callbacks && callbacks.error) { callbacks.error(); }
                    def.reject(response);
                    return;
                }
            });
        }).promise();

    };
    

    Plans.GetById = function (id, callbacks) {

        return $.Deferred(function (def) {
            dataservice.dataserviceplan.getplan({
                success: function (dto) {
                    if (!dto) {
                        if (callbacks && callbacks.error) {
                            callbacks.error();
                        }
                        def.reject();
                        return;
                    }

                    var planModel = mapper.plan.fromDto(dto);
                    if (dto.Activities.length > 0) {
                        var listActivities = mapper.activities.fromDtos(dto.Activities);
                        ko.utils.arrayForEach(listActivities, function (item) {
                            var businessId = item.BusinessId();

                            var yelpbusiness = new model.Yelp.Business();
                            yelpbusiness.id(businessId);

                            item.Detail(yelpbusiness);
                        });
                        planModel.Activities(listActivities);
                    }
                        
                    if (callbacks && callbacks.success) { callbacks.success(planModel); }
                    def.resolve(planModel);

                },
                error: function (response) {
                    if (callbacks && callbacks.error) { callbacks.error(); }
                    def.reject(response);
                    return;
                }
            }, id);
        }).promise();

    };
    

    
    /*
    Plans.GetWithBusinessesByPlanId = function (id, callbacks) {

        return $.Deferred(function (def) {
            dataservice.dataserviceplan.getplan({
                success: function (dto) {
                    if (!dto) {
                        if (callbacks && callbacks.error) {
                            callbacks.error();
                        }
                        def.reject();
                        return;
                    }
                    var planModel = mapper.plan.fromDto(dto);
                    if (dto.Activities.length > 0) {
                        var listActivities = mapper.activities.fromDtos(dto.Activities);

                       ko.utils.arrayForEach(listActivities, function(item) {
                                var businessId = item.BusinessId();

                                var yelpbusiness = new model.Yelp.Business();
                                yelpbusiness.id(businessId);
                                
                                item.Detail(yelpbusiness);
                            });

                       planModel.Activities(listActivities);
                        //Resolve the callback
                       if (callbacks && callbacks.success) {
                           callbacks.success(planModel);
                       }
                       def.resolve(planModel);
                       
                    } else {
                        if (callbacks && callbacks.success) {
                            callbacks.success(planModel);
                        }
                        def.resolve(planModel);
                    }

                },
                error: function (response) {
                    if (callbacks && callbacks.error) { callbacks.error(); }
                    def.reject(response);
                    return;
                }
            }, id);
        }).promise();

    };
    */


    Activities.GetByPlanId = function (planid,callbacks) {

        return $.Deferred(function (def) {
            dataservice.dataserviceactivity.getactivitiesbyplanid({
                success: function (dtos) {
                    if (!dtos) {
                        def.reject();
                        return;
                    }
                    var activities = mapper.activities.fromDtos(dtos);
                    if (callbacks && callbacks.success) { callbacks.success(activities); }
                    def.resolve(activities);
                },
                error: function (response) {
                    if (callbacks && callbacks.error) { callbacks.error(); }
                    def.reject(response);
                    return;
                }
            }, planid);
        }).promise();

    };






    Activities.Create = function (activityModel, callbacks) {
        var activityModelJson = ko.toJSON(activityModel);
        return $.Deferred(function (def) {
            dataservice.dataserviceactivity.activityCreate({
                success: function (dto) {
                    if (!dto) {
                        if (callbacks && callbacks.error) {
                            callbacks.error();
                        }
                        def.reject();
                        return;
                    }

                    activityModel = mapper.activity.fromDto(dto, activityModel);
                    if (callbacks && callbacks.success) { callbacks.success(activityModel); }
                    def.resolve(dto);

                },
                error: function (response) {
                    if (callbacks && callbacks.error) { callbacks.error(); }
                    def.reject(response);
                    return;
                }
            }, activityModelJson);
        }).promise();

    };
    

    Activities.Update = function (activityModel, callbacks) {
        var activityeModelJson = ko.toJSON(activityModel);

        return $.Deferred(function (def) {
            dataservice.dataserviceactivity.activityUpdate({
                success: function (response) {
                    activityModel.dirtyFlag().reset();
                    if (callbacks && callbacks.success) { callbacks.success(); }
                    def.resolve(response);
                },
                error: function (response) {
                    if (callbacks && callbacks.error) { callbacks.error(); }
                    def.reject(response);
                    return;
                }
            }, activityeModelJson);
        }).promise();
    };


    Activities.Delete = function (activityId, callbacks) {

        return $.Deferred(function (def) {
            dataservice.dataserviceactivity.activityDelete({
                success: function () {
                    if (callbacks && callbacks.success) { callbacks.success(); }
                    def.resolve();
                },
                error: function (response) {
                    if (callbacks && callbacks.error) { callbacks.error(); }
                    def.reject(response);
                    return;
                }
            }, activityId);
        }).promise();

    };


 
    Yelp.GetBusinesses = function (parameter, callbacks) {

        return $.Deferred(function (def) {
            dataservice.dataserviceyelp.getBusinesses({
                success: function (dtos) {
                    if (!dtos) {
                        def.reject();
                        return;
                    }
                    var yelpbusinesses = mapper.yelpbusinesses.fromDtos(dtos);
                    if (callbacks && callbacks.success) { callbacks.success(yelpbusinesses); }
                    def.resolve(dtos);
                },
                error: function (response) {
                    if (callbacks && callbacks.error) { callbacks.error(); }
                    def.reject(response);
                    return;
                }
            }, parameter);
        }).promise();
        
    };
    
    Yelp.GetBusiness = function (parameter, callbacks) {

        return $.Deferred(function (def) {
            dataservice.dataserviceyelp.getBusiness({
                success: function (dto) {
                    if (!dto) {
                        def.reject();
                        return;
                    }
                    var yelpbusiness = mapper.yelpbusiness.fromDto(dto);
                    if (callbacks && callbacks.success) { callbacks.success(yelpbusiness); }
                    def.resolve(yelpbusiness);
                },
                error: function (response) {
                    if (callbacks && callbacks.error) { callbacks.error(); }
                    def.reject(response);
                    return;
                }
            }, parameter);
        }).promise();

    };

    var datacontext= {
        Plans: Plans,
        UserProfiles: UserProfiles,
        Activities: Activities,
        Yelp:Yelp
    };
    
    model.setDataContext(datacontext);

    return datacontext;
});