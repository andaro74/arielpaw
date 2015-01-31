
using AP.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AP.Contracts;

namespace AP.WebUI.APIControllers
{
    [Authorize]
    public class UsersController: ApiBaseController
    {
        public UsersController(IAndaroPlannerUow uow)
        {
            Uow = uow;
        }

        [ActionName("current")]
        public UserProfile GetCurrent()
        {
            var user = Uow.UserProfiles.CurrentUserGet(User.Identity.Name);
            if (user != null) return user;
            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
        }

    }
}
