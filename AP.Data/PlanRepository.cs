using AP.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AP.Model;
using System.Data.Entity.Infrastructure;
using System.Data;
using System.Data.Entity;
using ObjectInterfaces;

namespace AP.Data
{
    public class PlanRepository:EFRepository<Plan>, IPlanRepository
    {
        public PlanRepository(DbContext context) : base(context) { }


        public List<Plan> GetByUserId(int userId)
        {
            return DbContext.Set<Plan>().Where(plan => plan.UserId == userId).ToList();
        }
    }
}
