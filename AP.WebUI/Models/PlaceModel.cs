using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AP.WebUI.Models
{
    public  class PlaceVM
    {
        public int Id { get; set; }
        public Nullable<int> UserId { get; set; }
        public string BusinessId { get; set; }
        public int PlanId { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        
    }
}