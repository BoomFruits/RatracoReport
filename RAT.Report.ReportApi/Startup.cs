using Microsoft.Owin;
using Owin;
using RAT.Report.BusinessLogic.Utils;
using RAT.Report.ReportApi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TLS.Lib.OAuth;
using TLS.Lib.Web;

[assembly: OwinStartup(typeof(Startup))]

namespace RAT.Report.ReportApi
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCorsAllowAll();
            app.UseOAuthAuthentication(() => {
                return CacheInstance.Auth;
            });
        }
    }
}