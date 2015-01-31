using ObjectInterfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace AP.Model
{
    public partial class Activity : IObjectWithState
    {
        public int Id { get; set; }
        public string BusinessId { get; set; }
        public int PlanId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public virtual Plan Plan { get; set; }

        [NotMapped]
        public State State { get; set; }
    }
}
