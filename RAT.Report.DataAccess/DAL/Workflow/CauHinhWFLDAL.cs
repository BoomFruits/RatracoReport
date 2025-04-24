using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RAT.Report.Domain.Entities.Workflow;
using TLS.Lib.Net.Log;
using TLS.Lib.Net.Data;
using RAT.Report.Domain.DTO.Workflow;
using TLS.Lib.Net.Json;
using System.Data;
using RAT.Report.Domain.Constants;

namespace RAT.Report.DataAccess.DAL.Workflow
{
    public static class CauHinhWFLDAL
    {
        private static ILogger Logger = Logging.GetLogger(typeof(CauHinhWFLDAL));

        public static async Task<IEnumerable<ProcessEntity>> GetListProcess(byte? processType)
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
    }
}
