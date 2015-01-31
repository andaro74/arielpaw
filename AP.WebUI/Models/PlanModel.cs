using AP.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AP.WebUI.Models
{
    public class PlanVM
    {
        public PlanVM()
        {
            this.Places = new List<PlaceVM>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public Nullable<System.DateTime> PlanDate { get; set; }
        public ICollection<PlaceVM> Places { get; set; }
    }
}