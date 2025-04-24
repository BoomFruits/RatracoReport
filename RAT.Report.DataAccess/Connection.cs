using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.DataAccess
{
    public static class Connection
    {
        public static async Task<IDbConnection> OpenConnectionAsync(string connectionStringName)
        {
            return await DataAccess.OpenConnectionAsync(connectionStringName);
        }
        public static async Task<IDbConnection> OpenConnectionReportAsync()
        {
            return await DataAccess.OpenConnectionReportAsync();
        }


        public static IDbConnection OpenConnection(string connectionStringName)
        {
            return DataAccess.OpenConnection(connectionStringName);
        }
        public static IDbConnection OpenConnectionReport()
        {
            return DataAccess.OpenConnectionReport();
        }
    }
}
