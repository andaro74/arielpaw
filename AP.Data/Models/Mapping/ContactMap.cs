using AP.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AP.Data.Models.Mapping
{
    public class ContactMap : EntityTypeConfiguration<Contact>
    {
        public ContactMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Table & Column Mappings
            this.ToTable("Contacts");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.AppId).HasColumnName("AppId");
            this.Property(t => t.FirstName).HasColumnName("FirstName");
            this.Property(t => t.LastName).HasColumnName("LastName");
            this.Property(t => t.Email).HasColumnName("Email");
            this.Property(t => t.MobilePhoneNumber).HasColumnName("MobilePhoneNumber");

        }
    }
}
