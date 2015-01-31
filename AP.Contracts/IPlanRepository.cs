using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AP.Model;

namespace AP.Contracts
{
    public interface IPlanRepository : IRepository<Plan>
    {
        List<Plan> GetByUserId(int userId);
    }
}
