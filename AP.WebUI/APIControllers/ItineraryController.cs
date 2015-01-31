using AP.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AP.Contracts;
using AP.Data;
using AP.WebUI.Models;
using AutoMapper;

namespace AP.WebUI.APIControllers
{
  /*  public class ItineraryController : ApiController
    {
        //Check this resource http://www.asp.net/web-api/overview/creating-web-apis/creating-a-web-api-that-supports-crud-operations
        private IPlanRepository planRepository;
        private IActivityRepository _activityRepository;

        public ItineraryController()
        {
            planRepository = new Plans();
            _activityRepository= new Activities();
            Mapper.CreateMap<Plan, PlanModel>();
            Mapper.CreateMap<Activity, PlaceModel>();
        }

        public ItineraryController(IPlanRepository planrepo, IActivityRepository placerepo)
        {
            planRepository = planrepo;
            _activityRepository = placerepo;
            Mapper.CreateMap<Plan, PlanModel>();
            Mapper.CreateMap<Activity, PlaceModel>();
        }


        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public Plan Get(int id)
        {
          Plan p= planRepository.GetById(id);
          return p;
        }

        public PlanModel  GetByCustomerId(string users, int id)
        {
            List<Plan> plans = planRepository.GetAllByUserId(id);


          
            PlanModel planModel=new PlanModel();

            List<PlanModel> planModels = new List<PlanModel>();
            foreach (var p in plans)
            {
                var dest = Mapper.Map<Plan, PlanModel>(p);
                planModels.Add(dest);
            }

            PlanModel result = planModels.FirstOrDefault();


            return result;
        }

        // POST api/<controller>
        public PlanModel Post(Plan entity)
        {
            PlanModel planModel = new PlanModel();
            try
            {
                planRepository.Add(entity);

                foreach (Activity place in entity.Places)
                {
                    _activityRepository.Add(place);
                }

                planRepository.SaveChanges();

            }
            catch (Exception ex)
            {
                var m = ex.InnerException;
            }
            planModel = Mapper.Map<Plan, PlanModel>(entity);

            return planModel;
       }

        // PUT api/<controller>/5
        public PlanModel Put(int Id, Plan entity)
        {
            PlanModel planModel = new PlanModel();
            try
            {
                entity.Id = Id;

                planRepository.Update(entity);

                Activity place=entity.Places.Where(pl => pl.Id == 0).FirstOrDefault();

                _activityRepository.Add(place);
                /*foreach (Activity place in entity.Places.Where(pl => pl.Id == 0))
                {
                    _activityRepository.Add(place);
                }*/

              /*  foreach (Activity place in entity.Places)
                {
                    _activityRepository.Add(place);
                }*/

         /*       planRepository.SaveChanges();
            }
            catch (Exception ex)
            {
                var m = ex.InnerException;
            }
            planModel = Mapper.Map<Plan, PlanModel>(entity);
            return planModel;

        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }*/
}