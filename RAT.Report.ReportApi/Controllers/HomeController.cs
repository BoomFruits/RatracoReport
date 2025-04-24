using RAT.Report.BusinessLogic.Handlers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using TLS.Lib.Net.Log;
using TLS.Lib.Net.Service;

namespace RAT.Report.ReportApi.Controllers
{
    public class HomeController : BaseMvcController<HomeController>
    {
        public HomeController() : base()
        {
        }
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
