using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.BangGia
{
    public class BaoGiaEntity
    {
        public int? BaoGiaID { get; set; }
        public string SoBaoGia { get; set; }
        public short? LoaiBaoGia { get; set; }
        public string KhachHang_MaKH { get; set; }
        public string KhachHang_MST { get; set; }
	    public string KhachHang_Ten { get; set; }
	    public string KhachHang_DaiDien { get; set; }
	    public string KhachHang_DiaChi { get; set; }
        public string KhachHang_Tel { get; set; }
        public string KhachHang_Email { get; set; }
        public string NhaChuyenCho_MST { get; set; }
        public string NhaChuyenCho_Ten { get; set; }
        public string NhaChuyenCho_Diachi { get; set; }
        public string NhaChuyenCho_Phone { get; set; }
        public string NhaChuyenCho_Email { get; set; }
        public string NhaChuyenCho_DaiDien { get; set; }
        public DateTime? TuNgay { get; set; }
	    public DateTime? DenNgay { get; set; }
	    public string GhiChu { get; set; }
	    public short? TrangThai { get; set; }
	    public string CreatedBy { get; set; }
	    public DateTime? CreatedDate { get; set; }
	    public string ModifiedBy { get; set; }
	    public DateTime? ModifiedDate { get; set; }
	    public string NguoiTrinh { get; set; }
	    public DateTime? ThoiGianTrinh { get; set; }
    }
    public class BaoGia_Detail
    {
        public long? ID { get; set; }
        public int? BaoGiaID { get; set; }
        public int? PAVCID { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public string MaHangTCT { get; set; }
        public string MaHangRAT { get; set; }
        public short HinhThucVC { get; set; }
        public short PhuongThucGN { get; set; }
        public string TenHang { get; set; }
        public string DonViTinh { get; set; }
        public short? SoLuong { get; set; }
        public int? DonGiaBan { get; set; }
        public int? DonGiaNiemYet { get; set; }
        public long? TinhDongID { get; set; }
        public long? QuanDongID { get; set; }
        public long? PhuongDongID { get; set; }
        public int? KhuCNDongID { get; set; }
        public string MaKhuCNDong { get; set; }
        public string DiaChiDong { get; set; }
        public int? GaDongID { get; set; }
        public long? TinhTraID { get; set; }
        public long? QuanTraID { get; set; }
        public long? PhuongTraID { get; set; }
        public int? KhuCNTraID { get; set; }
        public string MaKhuCNTra { get; set; }
        public string DiaChiTra { get; set; }
        public int? GaTraID { get; set; }
        public int? GaLVQTID { get; set; }
        public string GhiChu { get; set; }
        public string MaDV { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public short? IsDieuChinh { get; set; }
        public short? TrangThai { get; set; }
        public string NguoiThanhLy { get; set; }
        public DateTime? ThoiGianThanhLy { get; set; }
       

    }
}
