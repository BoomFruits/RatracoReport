using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.HopDong
{
    public class HopDongEntity
    {
        public int? HopDongID { get; set; }
        public string SoHopDong { get; set; }
        public string KhachHang_MaKH { get; set; }
        public string KhachHang_MST { get; set; }
	    public string KhachHang_Ten { get; set; }
	    public string KhachHang_DaiDien { get; set; }
	    public string KhachHang_DiaChi { get; set; }
        public string KhachHang_TaiKhoan { get; set; }
        public string KhachHang_TaiNH { get; set; }
        public string KhachHang_Email { get; set; }
        public string KhachHang_Tel { get; set; }
        public string NhaChuyenCho_MST { get; set; }
        public string NhaChuyenCho_Ten { get; set; }
        public string NhaChuyenCho_Diachi { get; set; }
        public string NhaChuyenCho_Phone { get; set; }
        public string NhaChuyenCho_Email { get; set; }
        public string NhaChuyenCho_DaiDien { get; set; }
        public DateTime? NgayKy { get; set; }
	    public DateTime? TuNgay { get; set; }
	    public DateTime? DenNgay { get; set; }
       
        public string GhiChu { get; set; }
        public string FilePath { get; set; }
	    public short? TrangThai { get; set; }
	    public string CreatedBy { get; set; }
	    public DateTime? CreatedDate { get; set; }
	    public string ModifiedBy { get; set; }
	    public DateTime? ModifiedDate { get; set; }
	    public string NguoiThanhLy { get; set; }
	    public DateTime? ThoiGianThanhLy { get; set; }
    }
    public class HopDong_Detail
    {
        public long? PLHDID { get; set; }
        public int? HopDongID { get; set; }
        public long? BaoGiaDetailID { get; set; }
        public string SoPhuLuc { get; set; }
        public DateTime TuNgay { get; set; }
        public DateTime DenNgay { get; set; }
        public string MaHangTCT { get; set; }
        public string MaHangRAT { get; set; } 
        public string TenHang { get; set; }
        public string DonViTinh { get; set; }
        public short? SoLuong { get; set; }
        public int? DonGia { get; set; }
        public short HinhThucVC { get; set; }
        public short PhuongThucGN { get; set; }
        public long TinhDongID { get; set; }
        public long QuanDongID { get; set; }
        public long PhuongDongID { get; set; }
        public long GaDongID { get; set; }
        public int? KHuCNDongID { get; set; }
        public string MaKhuCNDong { get; set; }
        public string NguoiDong_Ten { get; set; }
        public string NguoiDong_Phone { get; set; }
        public long TinhTraID { get; set; }
        public long QuanTraID { get; set; }
        public long PhuongTraID { get; set; }
        public int GaTraID { get; set; }
        public int? KHuCNTraID { get; set; }
        public string MaKhuCNTra { get; set; }
        public string NguoiTra_Ten { get; set; }
        public string NguoiTra_Phone { get; set; }
        public int GaLVQTID { get; set; }
        public string GhiChu { get; set; }
        public string MaDV { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public short IsDieuChinh { get; set; }
        public short TrangThai { get; set; }
        public string NguoiThanhLy { get; set; }
        public DateTime ThoiGianThanhLy { get; set; }

    }
}
