using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using TLS.Lib.Net.Data;

namespace RAT.Report.BusinessLogic.Report
{
    public class SqlGridReportReader : SqlGridReader
    {
        public SqlGridReportReader(SqlMapper.GridReader reader) : base(reader)
        {
        }

        //
        // Summary:
        //     Read the next grid of results
        public IEnumerable<T> ReadReport<T>(bool buffered = true)
            where T : ReportObject
        {
            var result = new List<T>();
            var data = _reader.Read<object>(buffered);
            foreach (var item in data)
            {
                result.Add(ReportDataExtensions.CreateReportObject<T>(item));
            }
            return result;
        }

        public IEnumerable<ReportObject> ReadReport(bool buffered = true)
        {
            return ReadReport<ReportObject>(buffered);
        }
    }
}
