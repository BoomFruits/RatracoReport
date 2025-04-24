using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using TLS.Lib.Web;

namespace RAT.Report.ReportApi.Controllers
{
    public abstract class BaseReportApiController<T> : BaseApiController<T> where T : ApiController
    {
        protected BaseReportApiController() : base()
        {
        }
    }
}