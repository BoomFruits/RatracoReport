using RAT.Report.Domain.DTO;
using RAT.Report.Domain.DTO.Workflow;
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
    public static class ReferenceDAL
    {
        private static ILogger Logger = Logging.GetLogger(typeof(ReferenceDAL));
        public static async Task<IEnumerable<ReferenceEntity>> GetListReferenceByIdProcess(short processID)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = "select * from [wfl].[Reference] where ProcessID = @processID";
                    var param = new
                    {
                        processID
                    };

                    return await conn.QueryAsync<ReferenceEntity>(sql, param);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "Can not get list Reference with ProcessID = {0}", processID);
                throw;
            }
        }

        public static async Task<ReferenceEntity> GetReferenceById(int referenceID)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = "select * from [wfl].[Reference] where ID = @referenceID";
                    var param = new
                    {
                        referenceID
                    };

                    var result =  await conn.QueryAsync<ReferenceEntity>(sql, param);
                    return result.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "Can not get Reference with ProcessID = {0}", referenceID);
                throw;
            }
        }

        public static async Task<bool> CapNhatRference(AddReferenceInput reference)
        {
            if (reference.ID > 0)
            {
                return await UpdateRference(reference);
            }
            else
            {
                return await ThemMoiRference(reference);
            }
        }

        public static async Task<bool> ThemMoiRference(AddReferenceInput reference)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = "[wfl].[Reference_ThemMoi]";
                    var param = new
                    {
                        reference.ProcessID,
                        reference.Name,
                        reference.Label,
                        reference.DataType,
                        reference.IsDonVi,
                        reference.Control,
                        reference.GhiChu
                    };

                    await conn.ExecuteSpAsync(sql, param);
                    return true;
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "Can not get Reference with ProcessID = {0}", reference);
                throw;
            }
        }
        public static async Task<bool> UpdateRference(AddReferenceInput reference)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = "[wfl].[Reference_CapNhat]";
                    var param = new
                    {
                        reference.ID,
                        reference.ProcessID,
                        reference.Name,
                        reference.Label,
                        reference.DataType,
                        reference.Control,
                        reference.IsDonVi,
                        reference.GhiChu
                    };

                    await conn.ExecuteSpAsync(sql, param);
                    return true;
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "Can not get Reference with ProcessID = {0}", reference);
                throw;
            }
        }
        public static async Task<bool> DeleteReference(int id)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = "Delete [wfl].[Reference] where ID = @id";
                    var param = new
                    {
                        id
                    };

                    await conn.ExecuteAsync(sql, param);
                    return true;
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "Can not delete Reference with referenID = {0}", id);
                throw;
            }
        }
        public static async Task<IEnumerable<ObjectTableDTO>> GetObjectTableByName(string tablename)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    ObjectTableDTO objectTable = new ObjectTableDTO();
                    IEnumerable<ObjectTableDTO> result = new List<ObjectTableDTO>();
                    var sql = "SELECT COLUMN_NAME as ColumnName, DATA_TYPE as DataType FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '" + tablename + "'";
                     var res = await conn.QueryAsync<ObjectTableDTO>(sql, null);

                    return res;
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "Can not get Table with TableName = {0}", tablename);
                throw;
            }
        }

    }
}
