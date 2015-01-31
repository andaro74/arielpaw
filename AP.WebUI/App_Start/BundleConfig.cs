using System.Web;
using System.Web.Optimization;

namespace AP.WebUI
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.UseCdn=true;

          /*  bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));*/

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include("~/Scripts/modernizr-{version}.js"));

            bundles.Add(
                new ScriptBundle("~/Scripts/vendor")
                
                    .Include("~/Scripts/knockout-{version}.js")
                    .Include("~/Scripts/knockout.validation.js")
                    .Include("~/Scripts/knockout.mapping-latest.js")
                    .Include("~/Scripts/knockout.activity.js")
                    .Include("~/Scripts/knockout.command.js")
                    .Include("~/Scripts/knockout.dirtyFlag.js")

                     .Include("~/Scripts/bootstrap-timepicker.js")
                    
                    .Include("~/Scripts/moment.js")
                     .Include("~/Scripts/amplify.js")
                      .Include("~/Scripts/bootstrap.js")
                     
                     
                     );


           bundles.Add(
              new ScriptBundle("~/js/thirdparty")

               //   .Include("~/js/jquery-{version}.js")
                  .Include("~/js/bootstrap.js")
                  //.Include("~/js/isotope.js")
                  .Include("~/js/flexslider.js")
                  .Include("~/js/carousel.js")
                   .Include("~/js/jquery.cslider.js")
                  .Include("~/js/slider.js")
                 //  .Include("~/js/fancybox.js")
                    .Include("~/js/custom.js")
                   );
            


            bundles.Add(new StyleBundle("~/Content/css")
                .Include(/*"~/Content/app.css",*/
                "~/Content/durandal.css",
                "~/Content/bootstrap.css", 
                "~/Content/bootstrap-responsive.css", 
                "~/Content/font-awesome.css",
                "~/Content/style.css",
             "~/Content/parallax-slider.css", 
                "~/Content/bootstrap-timepicker.css",
                "~/Content/zocial.css"));

            bundles.IgnoreList.Clear();

        }
    }
}