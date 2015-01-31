using ObjectInterfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace AP.Model
{
    public partial class Plan : IObjectWithState
    {
        public Plan()
        {
            this.Activities = new List<Activity>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime StartDate { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public String SelectedLocationName { get; set; }

        public virtual ICollection<Activity> Activities { get; set; }

        [NotMapped]
        public State State { get; set; }
    }
}
