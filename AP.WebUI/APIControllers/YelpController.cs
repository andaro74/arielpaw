using AP.WebUI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AP.WebUI.APIControllers
{
    public class YelpController : ApiController
    {
        // GET api/<controller>
        public YelpAuthorizationModel Get()
        {
            YelpAuthorizationModel yModel = new YelpAuthorizationModel();
            yModel.consumerKey = "gyi2ODBQVlQcje_SNWE4Pg";
            yModel.consumerSecret = "5FIDOFLMCNogSAkDTuHfJ7m0wmw";
            yModel.accessToken = "CD7IqeXtZLNvnVkzeEHeXgMCCUrUoEEM";
            yModel.accessTokenSecret = "acdsFFqnzh0HCM_eJ0rppnAXTSM";
            return yModel;
        }
        
        /*
        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }*/
    }
}