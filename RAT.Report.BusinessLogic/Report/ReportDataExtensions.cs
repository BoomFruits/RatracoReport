using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using TLS.Lib.Net.Data;

namespace RAT.Report.BusinessLogic.Report
{
    public static class ReportDataExtensions
    {
        internal static T CreateReportObject<T>(object values)
            where T : ReportObject
        {
            var reportType = typeof(T);
            if (reportType == typeof(ReportObject))
            {
                return (T)new ReportObject(values);
            }
            else
            {
                return (T)Activator.CreateInstance(reportType, new[] { values });
            }
        }
        public static IEnumerable<T> ExecuteReport<T>(this IDbConnection conn, string sql, object param = null, IDbTransaction transaction = null, bool buffered = true, int? commandTimeout = default(int?), CommandType? commandType = default(CommandType?))
            where T : ReportObject
        {
            var result = new List<T>();
            var data = SqlExtensions.Query<object>(conn, sql, param, transaction, buffered, commandTimeout, commandType);
            foreach (var item in data)
            {
                result.Add(CreateReportObject<T>(item));
            }
            return result;
        }
        public static IEnumerable<ReportObject> ExecuteReport(this IDbConnection conn, string sql, object param = null, IDbTransaction transaction = null, bool buffered = true, int? commandTimeout = default(int?), CommandType? commandType = default(CommandType?))
        {
            return ExecuteReport(conn, sql, param, transaction, buffered, commandTimeout, commandType);
        }
        public static IEnumerable<ReportObject> ExecuteSpReport(this IDbConnection conn, string sp, object param = null, IDbTransaction transaction = null, bool buffered = true, int? commandTimeout = default(int?))
        {
            return ExecuteReport(conn, sp, param, transaction, buffered, commandTimeout, commandType: CommandType.StoredProcedure);
        }
        public static async Task<IEnumerable<T>> ExecuteReportAsync<T>(this IDbConnection conn, string sql, dynamic param = null, IDbTransaction transaction = null, int? commandTimeout = default(int?), CommandType? commandType = default(CommandType?))
            where T : ReportObject
        {
            var result = new List<T>();
            var data = await SqlExtensions.QueryAsync<object>(conn, sql, param, transaction, commandTimeout, commandType);
            foreach (var item in data)
            {
                result.Add(CreateReportObject<T>(item));
            }
            return result;
        }
        public static async Task<IEnumerable<ReportObject>> ExecuteReportAsync(this IDbConnection conn, string sql, dynamic param = null, IDbTransaction transaction = null, int? commandTimeout = default(int?), CommandType? commandType = default(CommandType?))
        {
            return await ExecuteReportAsync<ReportObject>(conn, sql, param, transaction, commandTimeout, commandType);
        }
        public static async Task<IEnumerable<T>> ExecuteSpReportAsync<T>(this IDbConnection conn, string sp, dynamic param = null, IDbTransaction transaction = null, int? commandTimeout = default(int?))
            where T : ReportObject
        {
            return await ExecuteReportAsync<T>(conn, sp, param, transaction, commandTimeout, commandType: CommandType.StoredProcedure);
        }
        public static async Task<IEnumerable<ReportObject>> ExecuteSpReportAsync(this IDbConnection conn, string sp, dynamic param = null, IDbTransaction transaction = null, int? commandTimeout = default(int?))
        {
            return await ExecuteReportAsync(conn, sp, param, transaction, commandTimeout, commandType: CommandType.StoredProcedure);
        }
        //
        // Summary:
        //     Execute a command that returns multiple result sets, and access each in turn
        public static SqlGridReportReader QueryReportMultiple(this IDbConnection cnn, string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = default(int?), CommandType? commandType = default(CommandType?))
        {
            var reader = Dapper.SqlMapper.QueryMultiple(cnn, sql, param, transaction, commandTimeout, commandType);
            return new SqlGridReportReader(reader);
        }
        //
        // Summary:
        //     Execute a command that returns multiple result sets, and access each in turn
        public static async Task<SqlGridReportReader> QueryReportMultipleAsync(this IDbConnection cnn, string sql, dynamic param = null, IDbTransaction transaction = null, int? commandTimeout = default(int?), CommandType? commandType = default(CommandType?))
        {
            var reader = await Dapper.SqlMapper.QueryMultipleAsync(cnn, sql, param, transaction, commandTimeout, commandType);
            return new SqlGridReportReader(reader);
        }
        //
        // Summary:
        //     Execute a Stored Procedure that returns multiple result sets, and access each in turn
        public static SqlGridReportReader QuerySpReportMultiple(this IDbConnection cnn, string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = default(int?))
        {
            return QueryReportMultiple(cnn, sql, param, transaction, commandTimeout, commandType: CommandType.StoredProcedure);
        }
        //
        // Summary:
        //     Execute a Stored Procedure that returns multiple result sets, and access each in turn
        public static async Task<SqlGridReportReader> QuerySpReportMultipleAsync(this IDbConnection cnn, string sql, dynamic param = null, IDbTransaction transaction = null, int? commandTimeout = default(int?))
        {
            return await QueryReportMultipleAsync(cnn, sql, param, transaction, commandTimeout, commandType: CommandType.StoredProcedure);
        }
    }
}
