using AP.Contracts;
using AP.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AP.Data
{
    public class ActivityRepository:EFRepository<Activity>, IActivityRepository
    {
        public ActivityRepository(DbContext context) : base(context) { }

        public List<Activity> GetByPlanId(int planId)
        {
            return DbContext.Set<Activity>().Where(activity => activity.PlanId == planId).OrderBy(activity=>activity.Id).ToList();
       
        }


    }
}
