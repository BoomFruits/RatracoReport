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
    public static class UyQuyenDAL
    {
        private static ILogger Logger = Logging.GetLogger(typeof(WorkflowDAL));
        public static async Task<IEnumerable<UyQuyenEntity>> GetListUyQuyen(short processID, int? phanQuyenID = null)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sp = @"[wfl].[GetListUyQuyen]";
                    var param = new
                    {
                        processID,
                        phanQuyenID
                    };
                    return await conn.QuerySpAsync<UyQuyenEntity>(sp, param);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetListUyQuyen Exception with processID={0}", processID);
                throw;
            }
        }
        public static async Task<IEnumerable<UyQuyenOutput>> GetListUyQuyenByIdPhanQuyen(int phanQuyenID)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sp = @"[wfl].[UyQuyen_GetListUyQuyenByIdPhanQuyen]";
                    var param = new
                    {
                        phanQuyenID
                    };
                    return await conn.QuerySpAsync<UyQuyenOutput>(sp, param);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetListUyQuyen Exception with phanQuyenID = {0}", phanQuyenID);
                throw;
            }
        }
        //public static async Task<bool> ThemMoiUyQuyen(CapNhatuyQuyenInput uyQuyen)
        //{
        //    try
        //    {
        //        using (var conn = DataAccess.OpenConnection())
        //        {
        //            var sp = @"INSERT INTO [wfl].[UyQuyen]
			     //               ([PhanQuyenID]
		      //                 ,[CanBoNhanUyQuyen]
        //                       ,[CoDieuKien]
        //                       ,[Email]
        //                       ,[PhoneNumber]
        //                       ,[Timeout]
        //                       ,[GhiChu]
        //                       ,[ApDungTu]
        //                       ,[ApDungDen])
        //                    VALUES(
	       //                      @PhanQuyenID,
	       //                      @canBoNhanUyQuyen,
	       //                      @CoDieuKien,
	       //                      @Email,
	       //                      @PhoneNumber,
	       //                      @TimeOut,
	       //                      @GhiChu,
	       //                      @ApDungTu,
	       //                      @ApDungDen)";

        //            await conn.ExecuteAsync(sp, uyQuyen);
        //            return true;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Logger.ErrorFormat(ex, "Thêm mới cán bộ ủy quyền không thành công!");
        //        throw;
        //    }
        //}
        //public static async Task<bool> CapNhatUyQuyen(CapNhatuyQuyenInput uyQuyen)
        //{
        //    try
        //    {
        //        using (var conn = DataAccess.OpenConnection())
        //        {
        //            var sp = @"[wfl].[UyQuyen_CapNhat]";
        //            var param = new
        //            {
        //                uyQuyen
        //            };
        //            await conn.QuerySpAsync(sp, param);
        //            return true;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Logger.ErrorFormat(ex, "Cập nhật cán bộ ủy quyền không thành công!");
        //        throw;
        //    }
        //}
        public static async Task<IEnumerable<DKUQandGhiChu>> GetDieuKienUyQuyenByIdUyQuyen(int uyquyenID, int referenceID)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sp = @"[wfl].[DieuKienUyQuyen_GetListById]";
                    var param = new
                    {
                        uyquyenID,
                        referenceID
                    };
                    return await conn.QuerySpAsync<DKUQandGhiChu>(sp, param);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetListDieuKienUyQuyen Exception with uyquyenID={0}", uyquyenID);
                throw;
            }
        }
        public static async Task<bool> ThemMoiDieuKienUyQuyen(DieuKienUyQuyenDTO dieuKienUyQuyen)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sp = @"[wfl].[DieuKienUyQuyen_ThemMoi]";
                    var param = new
                    {
                        dieuKienUyQuyen
                    };
                    await conn.QuerySpAsync(sp, dieuKienUyQuyen);
                    return true;
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "Thêm mới điều kiện ủy quyền không thành công!");
                throw;
            }
        }
        public static async Task<bool> CapNhatDieuKienUyQuyen(DieuKienUyQuyenDTO dieuKienUyQuyen)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sp = @"[wfl].[DieuKienUyQuyen_CapNhat]";
                    var param = new
                    {
                        dieuKienUyQuyen
                    };
                    await conn.QuerySpAsync(sp, dieuKienUyQuyen);
                    return true;
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "Cập nhật điều kiện ủy quyền không thành công!");
                throw;
            }
        }
        public static async Task<bool> DeleteUyQuyen(int uyQuyenID)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sp = @"[wfl].[UyQuyen_DeleteUyQuyen]";
                    var param = new
                    {
                        uyQuyenID
                    };
                    await conn.ExecuteSpAsync(sp, param);
                    return true;
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "Cập nhật điều kiện ủy quyền không thành công!");
                throw;
            }
        }
        public static async Task<IEnumerable<UyQuyenOutput>> GetUyQuyenById(int id)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sp = @"[wfl].[UyQuyen_GetUyQuyenById]";
                    var param = new
                    {
                        id
                    };
                     return await conn.QuerySpAsync<UyQuyenOutput>(sp, param);
                   
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "Cập nhật điều kiện ủy quyền không thành công!");
                throw;
            }
        }
    }
}
