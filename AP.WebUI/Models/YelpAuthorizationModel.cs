using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AP.WebUI.Models
{
    public class YelpAuthorizationModel
    {
        public string consumerKey { get; set; }
        public string consumerSecret { get; set; }
        public string accessToken { get; set; }
        public string accessTokenSecret { get; set; }
    }
    
}