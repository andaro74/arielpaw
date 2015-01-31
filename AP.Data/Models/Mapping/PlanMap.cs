using AP.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AP.Data.Models.Mapping
{
    public class PlanMap : EntityTypeConfiguration<Plan>
    {
        public PlanMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(250);

            // Table & Column Mappings
            this.ToTable("Plans");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.UserId).HasColumnName("UserId");
            this.Property(t => t.Description).HasColumnName("Description");
            this.Property(t => t.CreatedDate).HasColumnName("CreatedDate");

            this.Property(t => t.StartDate).HasColumnName("StartDate");

            this.Property(t => t.Lat).HasColumnName("Lat");

            this.Property(t => t.Lng).HasColumnName("Lng");

            this.Property(t => t.SelectedLocationName).HasColumnName("SelectedLocationName");
        }
    }
}
