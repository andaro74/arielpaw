using AP.Contracts;
using AP.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AP.Data
{
    public class UserRepository:EFRepository<UserProfile>, IUserRepository
    {
        public UserRepository(DbContext context) : base(context) { }

        public UserProfile CurrentUserGet(string userName)
        {
            var currentUsers= DbContext.Set<UserProfile>().Where(user => user.UserName == userName).ToList();
            return (currentUsers.Any()) ? currentUsers[0]:null;
        }
    }
}
