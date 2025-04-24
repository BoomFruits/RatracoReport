using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TLS.Lib.Net.Log;
using TLS.Lib.Net.Service;

namespace RAT.Report.ReportApi.Controllers
{
    public abstract class BaseMvcController<T> : Controller where T : Controller
    {
        protected ILogger Logger { get; }
        protected BaseMvcController() : base()
        {
            Logger = Logging.GetLogger(typeof(T));
        }

        protected TService GetService<TService>() where TService : IService
        {
            //return LazyUnity.GetContainer().Resolve<TService>();
            return (TService)DependencyResolver.Current.GetService(typeof(TService));
        }

        protected TInstance Resolve<TInstance>()
        {
            //return LazyUnity.GetContainer().Resolve<TInstance>();
            return (TInstance)DependencyResolver.Current.GetService(typeof(TInstance));
        }
    }
}