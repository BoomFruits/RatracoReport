using RAT.Report.BusinessLogic;
using RAT.Report.BusinessLogic.Handlers;
using RAT.Report.BusinessLogic.Handlers.Implementors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Mvc;
using TLS.Lib.Net.DependencyInjection;
using TLS.Lib.OAuth;
using TLS.Lib.Web;
//using RAT.Report.Service.Email.Handlers;
//using RAT.Report.Service.Email.Handlers.Implementors;
using RAT.Report.Service.Excel.Handlers;
using RAT.Report.Service.Excel.Handlers.Implementors;

namespace RAT.Report.ReportApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.RegisterOAuth();

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            config.RegisterTraceRequest();
            config.RegisterUnity(resolver => {
                resolver.RegisterType<ITestExcelService, TestExcelService>();
                //resolver.RegisterType<IEmailService, EmailService>();
                resolver.RegisterType<ICacheService, CacheService>();
                resolver.RegisterType<ITestService, TestService>();
            });

            // Apply to mvc dependency resolver
            DependencyResolver.SetResolver(type => {
                return LazyUnity.GetContainer().Resolve(type);
            }, type => {
                return LazyUnity.GetContainer().ResolveAll(type);
            });
        }
    }
}
