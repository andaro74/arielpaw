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
    public class ContactRepository : EFRepository<Contact>, IContactRepository
    {
        public ContactRepository(DbContext context) : base(context) { }


        /*public List<Contact> GetByUserId(int userId)
        {
            return DbContext.Set<Plan>().Where(plan => plan.UserId == userId).ToList();
        }*/
    }
}
