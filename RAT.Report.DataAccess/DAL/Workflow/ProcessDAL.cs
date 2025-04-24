using RAT.Report.Domain.Entities.Workflow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLS.Lib.Net.Data;
using TLS.Lib.Net.Log;

namespace RAT.Report.DataAccess.DAL.Workflow
{
    public static class ProcessDAL
    {
        private static ILogger Logger = Logging.GetLogger(typeof(WorkflowDAL));

        public static async Task<IEnumerable<ProcessEntity>> GetListProcess(byte? processType = null)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = "select * from [wfl].[Process] where (@processType is null or ProcessType = @processType)";
                    var param = new
                    {
                        processType
                    };

                    return await conn.QueryAsync<ProcessEntity>(sql, param);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetListProcess xception with processType={0}", processType);
                throw;
            }
        }
        public static async Task<ProcessEntity> GetProcessByID(short processID)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = "select * from [wfl].[Process] where ProcessID = @processID";
                    var param = new
                    {
                        processID
                    };

                    var res = await conn.QueryAsync<ProcessEntity>(sql, param);
                    return res.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetOneProcess xception with processID={0}", processID);
                throw;
            }
        }
        public static async Task<ProcessEntity> GetProcessIDByObjectTableName(string ObjectTableName)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = "wfl.GetProcessIDByObjectTableName";
                    var param = new
                    {
                        ObjectTableName
                    };

                    var res = await conn.QueryAsync<ProcessEntity>(sql, param,commandType:System.Data.CommandType.StoredProcedure);
                    return res.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetProcessIDByObjectTableName xception with ObjectTableName={0}", ObjectTableName);
                throw;
            }
        }
    }
}
