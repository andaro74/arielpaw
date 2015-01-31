using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AP.Contracts
{
    public interface IAndaroPlannerUow
    {
        void Commit();

        IPlanRepository Plans { get; }
        IActivityRepository Activities { get; }
        IUserRepository UserProfiles { get; }
        IContactRepository Contacts { get; }
    }
}
