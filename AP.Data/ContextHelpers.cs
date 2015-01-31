using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AP.Contracts;
using System.Data.Entity;
using ObjectInterfaces;

namespace AP.Data
{
    public static class ContextHelpers
    {
        //Only use with short lived contexts 
        public static void ApplyStateChanges(this DbContext context)
        {
            foreach (var entry in context.ChangeTracker.Entries<IObjectWithState>())
            {
                IObjectWithState stateInfo = entry.Entity;
                entry.State = StateHelpers.ConvertState(stateInfo.State);
            }
        }

        public static void ApplyChanges<TEntity>(TEntity root) where TEntity : class, IObjectWithState
        {
            using (var context=new AndaroDbContext())
            {
                context.Set<TEntity>().Add(root);
                CheckForEntititesWithoutStateInterface(context);
                foreach (var entry in context.ChangeTracker.Entries<IObjectWithState>())
                {
                    IObjectWithState stateInfo = entry.Entity;
                    entry.State = StateHelpers.ConvertState(stateInfo.State);
                    if (stateInfo.State == State.Unchanged)
                    {
                        var databaseValues = entry.GetDatabaseValues();
                        entry.OriginalValues.SetValues(databaseValues);

                    }
                }
    
            }

        }

        private static void CheckForEntititesWithoutStateInterface(AndaroDbContext context)
        {
            var entititiesWithoutState = from e in context.ChangeTracker.Entries()
                                         where !(e.Entity is IObjectWithState)
                                         select e;
            if (entititiesWithoutState.Any())
            {
                throw new NotSupportedException("All entities must implement IObjectWithState");
            }

        }



    }
}
