using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AP.Model
{
    public partial class YelpAuthorization
    {
        public string consumerKey { get; set; }
        public string consumerSecret { get; set; }
        public string accessToken { get; set; }
        public string accessTokenSecret { get; set; }
    }
}

