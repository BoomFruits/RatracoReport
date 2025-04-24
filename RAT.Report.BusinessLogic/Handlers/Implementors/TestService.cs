using RAT.Report.DataAccess.DAL.Workflow;
using RAT.Report.Domain.Entities.Workflow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLS.Lib.Net.Service;
using System.IO;
using RAT.Report.Domain.DTO.Test;
using RAT.Report.Service.Excel.Handlers;

namespace RAT.Report.BusinessLogic.Handlers.Implementors
{
    public class TestService : BaseService<TestService>, ITestService
    {
        private readonly ITestExcelService TestExcelService;
        public TestService(ITestExcelService testExcelService) : base()
        {
            TestExcelService = testExcelService;
        }

        private IEnumerable<TestItem> GetRandomData()
        {
            var rnd = new Random();
            return Enumerable.Range(1, rnd.Next(5, 100)).Select(m => new TestItem
            {
                ID = m * 100 + rnd.Next(0, 100),
                Name = "Test name " + Guid.NewGuid().ToString("N").Substring(rnd.Next(0, 23), rnd.Next(4, 8)),
                Amount = rnd.Next(0, int.MaxValue),
                CreatedTime = DateTime.Now.AddDays(m + rnd.Next(m, m + 10))
            });
        }

        public async Task<ProcessEntity> GetOneProcess(short processID)
        {
            Logger.DebugFormat("GetOneProcess {0}", processID);

            return await WorkflowDAL.GetOneProcess(processID);
        }

        public Task<FileInfo> TestExcelFile()
        {
            var data = GetRandomData();
            var result = TestExcelService.ExportItemAsFile(data);
            return Task.FromResult(result);
        }

        public Task<byte[]> TestExcelStream()
        {
            var data = GetRandomData();
            var result = TestExcelService.ExportItem(data);
            return Task.FromResult(result);
        }

        public Task<byte[]> TestExcelTemplateStream()
        {
            var data = GetRandomData();
            var result = TestExcelService.ExportTemplateTestStream(data);
            return Task.FromResult(result);
        }
        public Task<FileInfo> TestExcelTemplateFile()
        {
            var data = GetRandomData();
            var result = TestExcelService.ExportTemplateTestFile(data);
            return Task.FromResult(result);
        }
    }
}
