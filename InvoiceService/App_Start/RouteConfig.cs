using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace InvoiceService
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            // Before all your routes
            routes.MapRoute(
                "Root",
                "",
                defaults: new { controller = "Home", action = "Index" });

            // Your routes here

            // After all your routes
            routes.MapRoute(
                "DeepLink",
                "{*pathInfo}",
                defaults: new { controller = "Home", action = "Index" });
        }
    }
}
