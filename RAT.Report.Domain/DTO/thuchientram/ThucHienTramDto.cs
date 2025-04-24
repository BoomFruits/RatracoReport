using RAT.Report.Domain.Entities.DanhMuc;
using RAT.Report.Domain.Entities.ThucHien;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.ThucHienTram
{
    
    public class ThucHienLenhInput
    {
        public string Username { get; set; }
        public int? LoaiKH { get; set; }
        public IEnumerable<ThucHienLenhDetail> LenhItems { get; set; }
    }
    public class TimKiemLenhInput
    {
        public string Username { get; set; }
        public string MaLenh { get; set; }
        /// <summary>
        /// 1-Đóng hàng, 2 vc đường tàu ratraco, 21-vc đường biển, 22-vc đường sắt dùng tàu sài gòn or hà nội
        /// </summary>
        public int? LoaiKH { get; set; }
        public DateTime? NgayTacNghiep { get; set; }
        public int? GaTNID { get; set; }
        public int? TrangThai { get; set; }
    }
    public class TimKiemLenhOutput
    {
        public long? IsOK { get; set; }
        public string msg { get; set; }
        public string Username { get; set; }
        public string MaLenh { get; set; }
        public DateTime? NgayTacNghiep { get; set; }
        public int? GaTNID { get; set; }
        public IEnumerable<ThucHienLenhDetail> LenhItems { get; set; }
    }
    public class VanDonItem
    {
        public int GaXepID { get; set; }
        public int GaDoID { get; set; }

        public int? GiaCuoc { get; set; }
        public long? CongTien { get; set; }
        public string CreateBy { get; set; }

        public long? BookingID { get; set; }
        public string SoHieuXe { get; set; }
        public string MaHang { get; set; }
        public string TenHang { get; set; }
        public decimal? TrongLuong { get; set; }
        public string SoCONT { get; set; }
        public decimal? TuTrongCont { get; set; }
        public decimal? TaiTrongCont { get; set; }
        public decimal? RmaxCont { get; set; }
        public string GiayKemTheo { get; set; }
        public string SoHieuVNP { get; set; }
        public int? LoaiYCVC { get; set; }
        public int? HinhThucVC { get; set; }
        public int? LoaiKH { get; set; }
    }
}
