using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AP.Model;

namespace AP.Data.Models.Mapping
{
   public  class UserProfileMap : EntityTypeConfiguration<UserProfile>
    {
       public UserProfileMap()
       {
           // Primary Key
           this.HasKey(t => t.UserId);

           // Table & Column Mappings
           this.ToTable("UserProfile");
           this.Property(t => t.UserId).HasColumnName("UserId");
           this.Property(t => t.UserName).HasColumnName("UserName");
       }

    }
}
