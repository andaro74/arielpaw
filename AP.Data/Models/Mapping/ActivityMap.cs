using AP.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AP.Data.Models.Mapping
{
    public class ActivityMap : EntityTypeConfiguration<Activity>
    {
        public ActivityMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.BusinessId)
                .HasMaxLength(255);

            // Table & Column Mappings
            this.ToTable("Activities");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.BusinessId).HasColumnName("BusinessId");
            this.Property(t => t.PlanId).HasColumnName("PlanId");
            this.Property(t => t.StartDate).HasColumnName("StartDate");
            this.Property(t => t.EndDate).HasColumnName("EndDate");

            // Relationships
            this.HasRequired(t => t.Plan)
                .WithMany(t => t.Activities)
                .HasForeignKey(d => d.PlanId);

        }
    }
}
