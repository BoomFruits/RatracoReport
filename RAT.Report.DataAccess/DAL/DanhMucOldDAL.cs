using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLS.Lib.Net.Data;
using TLS.Lib.Net.Log;
using RAT.Report.Domain.DTO.DanhMuc.Old;

namespace RAT.Report.DataAccess.DAL
{
    public static class DanhMucOldDAL
    {
        private static ILogger Logger = Logging.GetLogger(typeof(DanhMucOldDAL));

        public static async Task<DMGa> GetOneGa(string maGa)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    string sql = @"select * from DanhMuc.Ga with(nolock) where MaGa = @maGa";
                    var param = new DynamicParameters();
                    param.Add("maGa", maGa, DbType.AnsiString, size: 3);
                    return (await conn.QueryAsync<DMGa>(sql, param)).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetOneGa exception with maGa={0}", maGa);
                throw;
            }
        }
        public static async Task<DMNhanVien> GetOneNhanVien(string maNV)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    string sql = @"SELECT [MaNV] ,[TenNV], [MaDV], [Active], [ActiveMobile], [ActiveDaiLy] FROM [DanhMuc].[NhanVien] WHERE MaNV=@maNV";
                    var param = new DynamicParameters();
                    param.Add("maNV", maNV, DbType.AnsiString, size: 15);
                    return (await conn.QueryAsync<DMNhanVien>(sql, param)).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetOneNhanVien exception with maNV={0}", maNV);
                throw;
            }
        }
        public static async Task<DMNhanVien> GetCurrentUserInfo(string userName)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = @"
                        SELECT nv.MaNV, nv.TenNV, dv.MaDV, dv.TenDV, ct.MaCT, ct.TenCT
                        FROM DanhMuc.NhanVien nv
                        inner join DanhMuc.DonVi dv on dv.MaDV = nv.MaDV
                        inner join DanhMuc.CongTy ct on ct.MaCT = dv.MaCT
                        where nv.Active = 1 and nv.MaNV = @userName
                    ";
                    var param = new DynamicParameters();
                    param.Add("userName", userName, DbType.AnsiString, size: 15);
                    return (await conn.QueryAsync<DMNhanVien>(sql, param)).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetCurrentUserInfo exception with userName={0}", userName);
                throw;
            }
        }
        public static async Task<IEnumerable<DMNhanVien>> GetListNhanVien(string maDV)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = @"select * from DanhMuc.NhanVien where MaDV=@maDV";
                    var param = new DynamicParameters();
                    param.Add("maDV", maDV, DbType.AnsiStringFixedLength, size: 3);

                    return await conn.QueryAsync<DMNhanVien>(sql, param);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetListNhanVien exception with maDV={0}", maDV);
                throw;
            }
        }
        public static async Task<DMCuaVe> GetOneCuaVe(string maCV)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    string sql = @"SELECT cv.[MaCV], cv.[TenCV], cv.[MaDV] FROM [DanhMuc].[CuaVe] cv WHERE cv.MaNV=@maCV";
                    var param = new DynamicParameters();
                    param.Add("maCV", maCV, DbType.AnsiString, size: 15);
                    return (await conn.QueryAsync<DMCuaVe>(sql, param)).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetOneCuaVe exception with maCV={0}", maCV);
                throw;
            }
        }
        public static async Task<IEnumerable<DMCuaVe>> GetListCuaVeByNhanVien(string maNV)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = @"SELECT cv.[MaCV], cv.[TenCV], cv.[MaDV] FROM [DanhMuc].[CuaVe] cv 
                                INNER JOIN [DanhMuc].[NhanVien] nv ON nv.MaDV = cv.MaDv
                                WHERE nv.MaNV=@maNV";
                    var param = new DynamicParameters();
                    param.Add("maNV", maNV, DbType.AnsiString, size: 15);

                    return await conn.QueryAsync<DMCuaVe>(sql, param);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetListCuaVeByNhanVien exception with maNV={0}", maNV);
                throw;
            }
        }
        public static async Task<IEnumerable<DMCuaVe>> GetListCuaVe(string maDV)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = @"SELECT cv.[MaCV], cv.[TenCV], cv.[MaDV] FROM [DanhMuc].[CuaVe] cv
                                WHERE cv.MaDV=@maDV";
                    var param = new DynamicParameters();
                    param.Add("maDV", maDV, DbType.AnsiString, size: 15);

                    return await conn.QueryAsync<DMCuaVe>(sql, param);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetListCuaVe exception with maNV={0}", maDV);
                throw;
            }
        }
        public static async Task<DMDonVi> GetOneDonVi(string maDV)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    string sql = @"SELECT 
                                        [MaDV]
                                        ,[TenDV]
                                        ,[MaGaPA]
                                        ,[BDCa]
                                        ,[KTCa]
                                        ,[MaDVQL]
                                        ,[MaCT]
                                        ,[DVQL]
                                        ,[CapQL]
                                        ,[CodeQL]
                                    FROM [DanhMuc].[DonVi] 
                                    WHERE MaDV=@maDV";
                    var param = new DynamicParameters();
                    param.Add("maDV", maDV, DbType.AnsiStringFixedLength, size: 3);
                    return (await conn.QueryAsync<DMDonVi>(sql, param)).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetOneDonVi exception with maDV={0}", maDV);
                throw;
            }
        }
        public static async Task<IEnumerable<DMLoaiCho>> GetAllLoaiCho()
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = @"SELECT distinct LoaiCho FROM [DanhMuc].[DMLoaiCho]";

                    return await conn.QueryAsync<DMLoaiCho>(sql);
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex, "GetAllLoaiCho exception");
                throw;
            }
        }
        public static async Task<IEnumerable<DMPhuongThuc>> GetAllPhuongThuc()
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = @"SELECT 
                                        [MaPT]
                                        ,[TenPT]
                                        ,[TenPT2]
                                        ,[TyLe]
                                        ,[SapXep]
                                        ,[BanOnline]
                                        ,[TenPTOnline]
                                        ,[TenPTOnlineEn]
                                    FROM [DanhMuc].[PThuc]
                                    ORDER BY SapXep";

                    return await conn.QueryAsync<DMPhuongThuc>(sql);
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex, "GetAllPhuongThuc exception");
                throw;
            }
        }
        public static async Task<DMLePhiTV> GetOneLePhiTV(short maLP)
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    string sql = @"SELECT * FROM [DanhMuc].[LePhiTV]
                                    WHERE MaLP=@maLP";
                    var param = new DynamicParameters();
                    param.Add("maLP", maLP, DbType.Int16);
                    return (await conn.QueryAsync<DMLePhiTV>(sql, param)).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat(ex, "GetOneLePhiTV exception with maLP={0}", maLP);
                throw;
            }
        }
        public static async Task<IEnumerable<DMLePhiTV>> GetAllDMLePhiTV()
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = @"SELECT * 
                                FROM [DanhMuc].[LePhiTV]
                                ORDER BY MaLP";

                    return await conn.QueryAsync<DMLePhiTV>(sql);
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex, "GetAllDMLePhiTV exception");
                throw;
            }
        }
        public static async Task<IEnumerable<LoaiVeBS>> GetAllLoaiVeBS()
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = @"SELECT * FROM [DanhMuc].[LoaiVeBS] ORDER BY Loai, MaLoai";

                    return await conn.QueryAsync<LoaiVeBS>(sql);
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex, "GetAllLoaiVeBS exception");
                throw;
            }
        }
        public static async Task<IEnumerable<DMTuyen>> GetAllTuyen()
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = @"SELECT * from [DanhMuc].[Tuyen]";

                    return await conn.QueryAsync<DMTuyen>(sql);
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex, "GetAllTuyen exception");
                throw;
            }
        }
        public static async Task<IEnumerable<NhomDichVu>> GetListNhomDV()
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = @"SELECT * FROM dbo.NhomDichVu";

                    return await conn.QueryAsync<NhomDichVu>(sql);
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex, "GetListNhomDV exception");
                throw;
            }
        }
        public static async Task<IEnumerable<DMKhuyenMaiMaster>> GetListKhuyenMaiMaster()
        {
            try
            {
                using (var conn = DataAccess.OpenConnection())
                {
                    var sql = @"SELECT * FROM dbo.KhuyenMaiMaster a ORDER BY a.id DESC";

                    return await conn.QueryAsync<DMKhuyenMaiMaster>(sql);
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex, "GetListKhuyenMaiMaster exception");
                throw;
            }
        }
    }
}
