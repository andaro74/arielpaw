using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AP.Data;
using AP.Contracts;
using Ninject;
using System.Web.Http;

namespace AP.WebUI
{
    public class IocConfig
    {
        //http://www.peterprovost.org/blog/2012/06/19/adding-ninject-to-web-api/
        public static void RegisterIoc(HttpConfiguration config)
        {
            var kernel = new StandardKernel(); // Ninject IoC

            kernel.Bind<IAndaroPlannerUow>().To<AndaroPlannerUow>();

            config.DependencyResolver = new NinjectDependencyResolver(kernel);
        }


    }
}