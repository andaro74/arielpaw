using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AP.Model;

namespace AP.Contracts
{
    public interface IUserRepository:IRepository<UserProfile>
    {
        UserProfile CurrentUserGet(string userName);

    }
}
