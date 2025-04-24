
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLS.Lib.Net.Data;

namespace RAT.Report.DataAccess
{
    internal static class DataAccess
    {
        private const string ConnectionRatTMS = "SqlRatraco";
        private const string ConnectionRatReport = "SqlRatracoReport";

        private static string GetConnectionString(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                name = ConnectionRatTMS;
            }
            return ConfigurationManager.ConnectionStrings[name].ConnectionString;
        }
        
        internal static async Task<IDbConnection> OpenConnectionAsync(string connectionStringName)
        {
            return await SqlConnectionFactory.GetOpenAsync(GetConnectionString(connectionStringName));
        }
        internal static async Task<IDbConnection> OpenConnectionAsync()
        {
            return await SqlConnectionFactory.GetOpenAsync(GetConnectionString(ConnectionRatTMS));
        }
        internal static async Task<IDbConnection> OpenConnectionReportAsync()
        {
            return await SqlConnectionFactory.GetOpenAsync(GetConnectionString(ConnectionRatReport));
        }


        internal static IDbConnection OpenConnection(string connectionStringName)
        {
            return SqlConnectionFactory.GetOpen(GetConnectionString(connectionStringName));
        }
        internal static IDbConnection OpenConnection()
        {
            return SqlConnectionFactory.GetOpen(GetConnectionString(ConnectionRatTMS));
        }
        internal static IDbConnection OpenConnectionReport()
        {
            return SqlConnectionFactory.GetOpen(GetConnectionString(ConnectionRatReport));
        }

        internal static string AppendGetIdentity(this string query)
        {
            if (!string.IsNullOrEmpty(query))
            {
                var selectKey = "SELECT SCOPE_IDENTITY() as ID;";
                return string.Format("{0};{1}", query.TrimEnd(';'), selectKey);
            }
            return query;
        }
        internal static string AppendGetIdentityLong(this string query)
        {
            if (!string.IsNullOrEmpty(query))
            {
                var selectKey = "SELECT CAST(SCOPE_IDENTITY() as bigint) as ID;";
                return string.Format(";{0}", query.TrimEnd(';'), selectKey);
            }
            return query;
        }
    }
}
