using RAT.Report.Domain.DTO.Test;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLS.Lib.Net.Service;

namespace RAT.Report.Service.Excel.Handlers
{
    public interface ITestExcelService : IBaseExcelService
    {
        FileInfo ExportItemAsFile(IEnumerable<TestItem> data);
        byte[] ExportItem(IEnumerable<TestItem> data);
        byte[] ExportTemplateTestStream(IEnumerable<TestItem> data);
        FileInfo ExportTemplateTestFile(IEnumerable<TestItem> data);
    }
}
