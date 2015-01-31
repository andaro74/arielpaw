using AP.Contracts;
using AP.Model;
using AP.WebUI.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AP.WebUI.APIControllers
{
    public class ActivitiesController : ApiBaseController
    {
        public ActivitiesController(IAndaroPlannerUow uow)
        {
            Uow = uow;
            
        }

     
        // GET api/activities/5
        [ActionName("Default")]
        public Activity Get(int id)
        {
            var activity = Uow.Activities.GetById(id);
            if (activity != null) return activity;
            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
        }

        // POST api/activities

        [ActionName("Default")]
        public HttpResponseMessage Post(Activity activity)
        {
            //Get the current user Id. Don't send it from the UI
           Uow.Activities.Add(activity);
           Uow.Commit();
            var response = Request.CreateResponse(HttpStatusCode.Created, activity);
            response.Headers.Location = new Uri(Url.Link(WebApiConfig.ControllerAndId, new {id = activity.Id}));
            return response;
        }

        // PUT api/activities/5
        [ActionName("Default")]
        public HttpResponseMessage Put(Activity activity)
        {
            Uow.Activities.Update(activity);
            Uow.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        // DELETE api/activities/5
        [ActionName("Default")]
        public HttpResponseMessage Delete(int id)
        {
            Uow.Activities.Delete(id);
            Uow.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        [ActionName("Plan")]
        public List<Activity> GetByPlanId(int planId)
        {
            var activity = Uow.Activities.GetByPlanId(planId);
            if (activity != null) return activity;
            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
           // return activity ?? new List<Activity>();
        }

     
    }
}
