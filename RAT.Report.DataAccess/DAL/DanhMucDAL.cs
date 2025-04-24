using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TLS.Lib.Net.Data;
using TLS.Lib.Net.Log;
using RAT.Report.Domain.DTO.DanhMuc;
using RAT.Report.Domain.Entities.DanhMuc;

namespace RAT.Report.DataAccess.DAL
{
    public static class DanhMucDAL
    {
        private static ILogger Logger = Logging.GetLogger(typeof(DanhMucDAL));
        #region old
        public static async Task<IEnumerable<NhanVienInfo>> GetAllNhanVien(string maDV = null)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"DanhMuc.GetAllNhanVien";
                var param = new
                {
                    maDV = DataType.String(maDV, true, 3, true)
                };
                return await conn.QuerySpAsync<NhanVienInfo>(sp, param);
            }
        }
        public static async Task<NhanVienInfo> GetOneNhanVien(string maNV)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sql = @"select t.*, dv.TenDV, dv.MaCT from DanhMuc.NhanVien t
                            left join DanhMuc.DonVi dv on dv.MaDV = t.MaDV
                            where t.MaNV = @maNV";
                var param = new
                {
                    maNV = DataType.String(maNV, true, 50)
                };
                return (await conn.QueryAsync<NhanVienInfo>(sql, param)).FirstOrDefault();
            }
        }

        public static async Task<DonViInfo> GetOneDonVi(string maDV)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"select t.* from DanhMuc.DonVi t where MaDV = @maDV";
                var param = new
                {
                    maDV = DataType.String(maDV, true, 3, true)
                };
                return (await conn.QueryAsync<DonViInfo>(sp, param)).FirstOrDefault();
            }
        }
        public static async Task<IEnumerable<DonViInfo>> GetAllDonVi(string maDV = null, byte? capQL = null)
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"DanhMuc.GetAllDonVi";
                var param = new
                {
                    capQL,
                    maDV = DataType.String(maDV, true, 3, true)
                };
                return await conn.QuerySpAsync<DonViInfo>(sp, param);
            }
        }
        #endregion
        public static async Task<IEnumerable<KhachHangInfo>> GetListKhachHang()
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"select kh.* from DanhMuc.DMKhachHang kh where kh.LoaiKH in(1,2)";
              
                return await conn.QueryAsync<KhachHangInfo>(sp);
            }
        }
        public static async Task<IEnumerable<KhachHangInfo>> GetListNCC()
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"select kh.* from DanhMuc.DMKhachHang kh where kh.LoaiKH in(3,4,5,6)";

                return await conn.QueryAsync<KhachHangInfo>(sp);
            }
        }
        public static async Task<IEnumerable<ZoneInfo>> GetListZone()
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"select z.* from DanhMuc.DMZone z";

                return await conn.QueryAsync<ZoneInfo>(sp);
            }
        }
        public static async Task<IEnumerable<HangHoaInfo>> GetListHangHoa()
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"select h.* from DanhMuc.DMHangHoa h";

                return await conn.QueryAsync<HangHoaInfo>(sp);
            }
        }
        public static async Task<IEnumerable<DonViTinhInfo>> GetListDonViTinh()
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"select dvt.* from DanhMuc.DMDonViTinh dvt";

                return await conn.QueryAsync<DonViTinhInfo>(sp);
            }
        }
        public static async Task<IEnumerable<LoaiTacNghiepInfo>> GetListLoaiTacNghiep()
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"select ltn.* from DanhMuc.DMLoaiTacNghiep ltn";

                return await conn.QueryAsync<LoaiTacNghiepInfo>(sp);
            }
        }
        public static async Task<IEnumerable<DonViInfo>> GetListDonVi()
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"select dv.*,case when dv.CapQL = 2 then dv.TenDV when dv.CapQL = 3 then CONCAT('-- ',dv.TenDV) when dv.CapQL = 4 then CONCAT('---- ',dv.TenDV) end TenDVText from DanhMuc.DMDonVi dv where dv.LoaiDV=2 order by dv.CodeQL";

                return await conn.QueryAsync<DonViInfo>(sp);
            }
        }
        public static async Task<IEnumerable<LoaiHinhVCInfo>> GetListLoaiHinhVC()
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"select lh.* from DanhMuc.DMLoaiHinhVC lh where lh.IsActive>0";

                return await conn.QueryAsync<LoaiHinhVCInfo>(sp);
            }
        }
        public static async Task<IEnumerable<XuongSuaChuaInfo>> GetListXuongSuaChua()
        {
            using (var conn = await Connection.OpenConnectionReportAsync())
            {
                var sp = @"select top 100 xsc.* from DanhMuc.DMXuongSuaChuaToaXe xsc";

                return await conn.QueryAsync<XuongSuaChuaInfo>(sp);
            }
        }
    }
}
