using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AP.Contracts;

namespace AP.Data
{
    public class AndaroPlannerUow :IAndaroPlannerUow, IDisposable
    {
        private AndaroDbContext DbContext { get; set; }

        private IPlanRepository _planRepository;
        private IActivityRepository _activityRepository;
        private IUserRepository _userRepository;
        private IContactRepository _contactRepository;

        public IPlanRepository Plans
        {
            get { return this._planRepository ?? (this._planRepository = new PlanRepository(DbContext)); }
        }

        public IActivityRepository Activities
        {
            get { return this._activityRepository ?? (this._activityRepository = new ActivityRepository(DbContext)); }
        }

        public IUserRepository UserProfiles
        {
            get { return this._userRepository ?? (this._userRepository = new UserRepository(DbContext)); }
        }

        public IContactRepository Contacts
        {
            get { return this._contactRepository ?? (this._contactRepository = new ContactRepository(DbContext)); }
        }

        public void Commit()
        {
            DbContext.SaveChanges();
        }

        public AndaroPlannerUow()
        {
            CreateDbContext();
        }

        protected void CreateDbContext()
        {
            DbContext = new AndaroDbContext();

            //Do not enable proxies
            DbContext.Configuration.ProxyCreationEnabled = false;
            //Load navigation properties explicitly
            DbContext.Configuration.LazyLoadingEnabled = false;
        }

        #region IDisposable
        protected virtual void Dispose(bool disposing)
        {

            if (disposing)
            {
                if (DbContext != null)
                {
                    DbContext.Dispose();
                }
            }

        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        #endregion
    }
}
