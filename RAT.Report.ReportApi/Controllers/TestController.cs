using RAT.Report.BusinessLogic;
using RAT.Report.BusinessLogic.Handlers;
using RAT.Report.Domain.Entities.Workflow;
using RAT.Report.ReportApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using TLS.Lib.Net.Json;
using TLS.Lib.Net.Log;
using TLS.Lib.Web;

namespace RAT.Report.ReportApi.Controllers
{
    [RoutePrefix("api/Test")]
    public class TestController : BaseApiController<TestController>
    {
        private ITestService WorkflowService { get; }
        private ISerializer Serializer { get; }

        public TestController(ITestService workflowService, ISerializer serializer)
        {
            WorkflowService = workflowService;
            Serializer = serializer;
        }

        [HttpGet]
        public async Task<ProcessEntity> Index()
        {
            try
            {
                Logger.Debug("Tesst-Debug");
                var entity = await WorkflowService.GetOneProcess(1);

                int a = 0, b = 1;
                var c = b / a;

                return entity;
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }

        [HttpPost]
        public async Task<ProcessEntity> Index(TestModel model)
        {
            try
            {
                Logger.Debug("Tesst-Debug");
                var entity = await WorkflowService.GetOneProcess(model.Key);

                var g = Serializer.Serialize(entity);
                var xx = Resolve<ISerializer>();
                var t = xx.Serialize(entity);

                //int a = 0, b = 1;
                //var c = b / a;

                return entity;
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }

        [HttpGet]
        [Route("ExcelA")]
        [AllowAnonymous]
        public async Task<HttpResponseMessage> ExcelA(short id)
        {
            try
            {
                var entity = await WorkflowService.GetOneProcess(id);

                var fileStream = await WorkflowService.TestExcelTemplateStream();

                //int a = 0, b = 1;
                //var c = b / a;

                return FileDownloadExcel(fileStream, string.Format("Test_{0}.xlsx", DateTime.Now.ToString("yyMMddHHmm")));
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }

        [HttpGet]
        [Route("ExcelB")]
        [AllowAnonymous]
        public async Task<HttpResponseMessage> ExcelB(short id)
        {
            try
            {
                var entity = await WorkflowService.GetOneProcess(id);

                var file = await WorkflowService.TestExcelTemplateFile();

                //int a = 0, b = 1;
                //var c = b / a;

                return FileDownloadExcel(file.FullName);
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
    }
}