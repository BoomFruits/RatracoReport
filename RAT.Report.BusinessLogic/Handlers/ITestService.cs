using RAT.Report.Domain.Entities.Workflow;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLS.Lib.Net.Service;

namespace RAT.Report.BusinessLogic.Handlers
{
    public interface ITestService : IService
    {
        Task<ProcessEntity> GetOneProcess(short processID);
        Task<FileInfo> TestExcelFile();
        Task<byte[]> TestExcelStream();
        Task<byte[]> TestExcelTemplateStream();
        Task<FileInfo> TestExcelTemplateFile();
    }
}
