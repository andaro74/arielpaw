using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AP.Contracts;
using AP.Model;
using AP.WebUI.Models;
using AutoMapper;

namespace AP.WebUI.APIControllers
{
    public class PlansController : ApiBaseController
    {
        
        public PlansController(IAndaroPlannerUow uow)
        {
            Uow = uow;
           
        }

        // GET api/plans 
        [ActionName("default")]
        public List<Plan> Get()
        {
          var user = Uow.UserProfiles.CurrentUserGet(User.Identity.Name);
          //var plans = Uow.Plans.GetByUserId(user.UserId).Where(t=>t.StartDate.Date>=DateTime.Now.Date).OrderBy(p=>p.StartDate.Date).ToList();
          //var plans = Uow.Plans.GetByUserId(user.UserId).Take(5).OrderByDescending(a=>a.CreatedDate).ToList();

          var plans = Uow.Plans.GetByUserId(user.UserId).ToList();
            
           /*if (plans.Count>5)
                plans=plans.Take(5).ToList();*/

            foreach (var plan in plans)
            {
              if (plan != null)
              {
                  var activities = Uow.Activities.GetByPlanId(plan.Id);
                  plan.Activities = activities.OrderByDescending(a => a.StartDate).ToList();
              }
            }
            

            plans = plans.Where(p=>p.Activities.Count>0).OrderByDescending(x => x.Activities.OrderBy(a=>a.StartDate).FirstOrDefault().StartDate).Take(7).ToList();
        
          //Show the current five
            return plans;
        }

        [ActionName("latest")]
        public Plan GetLatest()
        {
           var plan= Uow.Plans.GetAll().OrderByDescending(s => s.Id).FirstOrDefault();

            if (plan == null)
            {

                var user = Uow.UserProfiles.CurrentUserGet(User.Identity.Name);

                plan = new Plan();
                plan.Name="Activities";
                plan.UserId = user.UserId;
                

                Uow.Plans.Add(plan);
                Uow.Commit();
            }
            //throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

            return plan;
        }

        // GET api/plans/5
        [ActionName("default")]
        public Plan Get(int id)
        {
            var plan = Uow.Plans.GetById(id);
            if (plan != null)
            {
                var activities = Uow.Activities.GetByPlanId(plan.Id);
                plan.Activities = activities.OrderBy(a=>a.StartDate).ToList();
               
            }
            return plan;
        }

        // POST api/plan
       [ActionName("default")]
        public HttpResponseMessage Post(Plan plan)
        {
            var user = Uow.UserProfiles.CurrentUserGet(User.Identity.Name);
           plan.UserId = user.UserId;
           plan.CreatedDate = DateTime.Now;
           Uow.Plans.Add(plan);
           Uow.Commit();
           var response = Request.CreateResponse(HttpStatusCode.Created, plan);
            response.Headers.Location = new Uri(Url.Link(WebApiConfig.ControllerAndId, new {id = plan.Id}));
           return response;
        }

        // PUT api/<controller>/5
        [ActionName("default")]
        public HttpResponseMessage Put(Plan entity)
        {
            Uow.Plans.Update(entity);
            Uow.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
        
       /* [ActionName("users")]
        public List<Plan> GetPlansByUsers(int id)
        {
           List<Plan> plans = Uow.Plans.GetAll().Where(p=>p.UserId==id).ToList();
           if (plans.Count>0) return plans;
           throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            
        }

        //getLocalSpeakerSessions
        [ActionName("activities")]
        public List<Activity> GetLocalActivitiesByPlan(int id)
        {
            List<Activity> plans = Uow.Activities.GetAll().Where(p => p.PlanId == id).ToList();
            if (plans.Count > 0) return plans;
            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));

        }
        */

        // DELETE api/plans/5
        [ActionName("default")]
        public HttpResponseMessage Delete(int id)
        {

            //Get all the activities from the plan
            var activities = Uow.Activities.GetByPlanId(id);
            foreach (var activity in activities)
            {
                Uow.Activities.Delete(activity.Id);
            }

            Uow.Plans.Delete(id);

            Uow.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
        
    }
}
