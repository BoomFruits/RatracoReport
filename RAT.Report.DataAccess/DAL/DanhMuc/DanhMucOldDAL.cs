
using RAT.Report.Domain.Entities.DanhMuc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLS.Lib.Net.Log;
using TLS.Lib.Net.Json;
using Dapper;
using System.Data;

namespace RAT.Report.DataAccess.DAL.DanhMuc
{
    public static class DanhMucOldDAL
    {
        private static ILogger Logger = Logging.GetLogger(typeof(DanhMucOldDAL));

        public static DMDonVi GetOneDonVi(string maDV)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = "select * from [DanhMuc].[DMDonVi] where MaDV = @maDV";
                    var param = new
                    {
                        maDV = new DbString { Value = maDV, IsAnsi = true, Length = 10 }
                    };

                    var res = conn.Query<DMDonVi>(sql, param);
                    return res.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetOneDonVi exception with maDV={0}", maDV);
                throw;
            }
        }
    }
}
