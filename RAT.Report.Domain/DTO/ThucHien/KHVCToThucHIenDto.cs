using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.ThucHien
{
    class KHVCToThucHIenDto
    {
    }
    public class KHVCtoThucHienOutput
    {
        public int TotalCount { get; set; }
        public string TinhDong { get; set; }
        public string QuanDong { get; set; }
        public string PhuongDong { get; set; }
        public string TinhTra { get; set; }
        public string QuanTra { get; set; }
        public string PhuongTra { get; set; }
        public string GaDong { get; set; }
        public string GaTra { get; set; }
        public string KhuCNDong { get; set; }
        public string KhuCNTra { get; set; }
        public string DiemDong { get; set; }
        public string DiemTra { get; set; }
        public string GaLVQT { get; set; }
        public long? YCVCID { get; set; }
        public string SoYCVC { get; set; }
        public int? LoaiYCVC { get; set; }
        public int? KieuYCVC { get; set; }
        public string YCVC_DonViTinh { get; set; }
        public string DiaChiDongHang { get; set; }
        public DateTime? ThoiGianDong { get; set; }
        public string DiaChiTraHang { get; set; }
        public DateTime? ThoiGianTra { get; set; }
        public string KhachHang_Ten { get; set; }
        public string TenHang { get; set; }
        public string DonViTinh { get; set; }

        /// <summary>
        /// so luong yeu cau
        /// </summary>
        public int SoLuong { get; set; }
        public string KHVC_GaDi { get; set; }
        public string KHVC_GaDen { get; set; }
        public int KHVC_TauID { get; set; }
        public int KHVC_GaDiID { get; set; }
        public int KHVC_GaDenID { get; set; }
        public long? KHVCID { get; set; }
        public DateTime? KHVC_ThoiGianDi { get; set; }
        public DateTime? KHVC_ThoiGianDen { get; set; }
        public int KHVC_SoLuong { get; set; }
        public string KHVC_DonViTinh { get; set; }
        public int KHVC_LoaiKH { get; set; }
        public int KHVC_SoLuongDa { get; set; }
        public int KHVC_SoLuongDang { get; set; }
        public int KHVC_TrangThai { get; set; }
        public string KHVC_TenTrangThai { get; set; }
        public int IsXepXeG { get; set; }
        public int IsDoXeG { get; set; }
        public string MacTauDisplay { get; set; }
    }
    public class KHVCtoThucHienInput
    {
        public int? GaDiID { get; set; }
        public int? GaDenID { get; set; }
        public DateTime? NgayTH { get; set; }
        public int? PageSize { get; set; }
        public int? PageNumber { get; set; }
        public string Username { get; set; }
        public int? LoaiKH { get; set; }
        public int? LoaiTN { get; set; }
        public int? TrangThai { get; set; }
        public int? HinhThucVC { get; set; }
        public int? KieuYCVC { get; set; }
    }
   
    public class ChiTietThucHienOutput
    {
        public long LenhCauID { get; set; }
        public long TaskID { get; set; }
        public long KHVCID { get; set; }
        public int? LoaiKH { get; set; }
        public long YCVCID { get; set; }
        public long BookingID { get; set; }
        public string SoBooking { get; set; }
        public string MaNCC { get; set; }
        public string SoXeCau { get; set; }
        public string SoCont { get; set; }
        public string SoHieuXe { get; set; }
        public string SoXeDK { get; set; }
        public int DonGia { get; set; }
        public int? DonGiaCau { get; set; }
        public int? DonGiaXDK { get; set; }
        public int? DonGiaTruc { get; set; }
        public int SoLuong { get; set; }
        public int TrangThai { get; set; }
        public string TenTrangThai { get; set; }
        public DateTime ThoiGianBD { get; set; }
        public DateTime ThoiGianKT { get; set; }
        public decimal SoLuongTC { get; set; }
        public decimal TanTT { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public int IsTraDong { get; set; }
        public string SoYCVC { get; set; }
        public string KhachHang_Ten { get; set; }
        public string KhachHang_DaiDien { get; set; }
        public string KhachHang_Phone { get; set; }
        public string TenHang { get; set; }
        public int YC_SoLuong { get; set; }
        public string YC_DonViTinh { get; set; }
        public decimal YC_DonGia { get; set; }
        public decimal YC_TongTien { get; set; }
        public int KHVC_TrangThai { get; set; }
        public int KHVC_LoaiKH { get; set; }
        public string KHVC_TenTrangThai { get; set; }
        public string TenTinhDong { get; set; }
        public string TenTinhTra { get; set; }
        public string TenQuanDong { get; set; }
        public string DiaChiDongHang { get; set; }
        public string TenQuanTra { get; set; }
        public string TenPhuongDong { get; set; }
        public string TenPhuongTra { get; set; }
        public string TenGaDong { get; set; }
        public string TenGaTra { get; set; }
        public string DiaChiTraHang { get; set; }
        public string TenGaLVQT { get; set; }
        public DateTime KHVC_ThoiGianDi { get; set; }
        public string KHVC_DonViTinh { get; set; }
        public int KHVC_SoLuong { get; set; }
        public string TenKhuCNDong { get; set; }
        public string TenKhuCNTra { get; set; }
        public string TenDiemDong { get; set; }
        public string TenDiemTra { get; set; }
        public string TenLenh { get; set; }
        //khach hang
        
        
    }
}
