using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using AP.Model;
using AP.Data.Models.Mapping;

namespace AP.Data
{
    public partial class AndaroDbContext : DbContext
    {
        static AndaroDbContext()
        {
            Database.SetInitializer<AndaroDbContext>(null);
        }

        public AndaroDbContext()
            : base("Name=AndaroDbContext")
        {
        }

        public DbSet<Activity> Places { get; set; }
        public DbSet<Plan> Plans { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<Contact> Contacts { get; set; }

        
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new ActivityMap());
            modelBuilder.Configurations.Add(new PlanMap());
            modelBuilder.Configurations.Add(new UserProfileMap());
            modelBuilder.Configurations.Add(new ContactMap());
        }
    }
}
