using RAT.Report.Domain.Entities.YCVC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.BanHang
{
    public class YCVCItem: YCVCEntity
    {
        public string TinhDong { get; set; }
        public string QuanDong { get; set; }
        public string PhuongDong { get; set; }
        public string TinhTra { get; set; }
        public string QuanTra { get; set; }
        public string PhuongTra { get; set; }
        public string GaDong { get; set; }
        public string GaTra { get; set; }
        public string GaLVQT { get; set; }
        public int TotalCount { get; set; }
        public string TenHinhThucVC { get; set; }
        public string TenPhuongThucGN { get; set; }
        public string TenTrangThai { get; set; }
        public string SoPhuLuc { get; set; }
        public string TenKhuCNDong { get; set; }
        public string TenKhuCNTra { get; set; }
        public string TenDiemDong { get; set; }
        public string TenDiemTra { get; set; }
        public string NhomDVT { get; set; }
    }
    public class YCVCInput
    {
        public string KhachHang_MaKH { get; set; }
        public int? TrangThai { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public int? PageSize { get; set; }
        public int? PageNumber { get; set; }

    }
    public class YCVCandNCVCId : YCVCEntity
    {
        public int  NCVCID { get; set; }
    }
    public class YCVCLapKHVCDetailItem
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
        public string GaLVQT { get; set; }
        public string TenHinhThucVC { get; set; }
        public string TenPhuongThucGN { get; set; }
        public string TenTrangThai { get; set; }
        public long? YCVCID { get; set; }
        public string SoYCVC { get; set; }
        public int? LoaiYCVC { get; set; }
        public int? KieuYCVC { get; set; }
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
        public long? KHVCID { get; set; }
        public string TenKHVC { get; set; }
        public DateTime? ThoiGianDi { get; set; }
        public DateTime? ThoiGianDen { get; set; }
        public int KHVC_SoLuong { get; set; }
        public int KHVC_SoLuongDa { get; set; }
        public int KHVC_SoLuongDang { get; set; }
        public int KHVC_TrangThai { get; set; }
    }
    public class YCVCLapKHVCItem
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
        public string GaLVQT { get; set; }
        public string TenHinhThucVC { get; set; }
        public string TenPhuongThucGN { get; set; }
        public string TenTrangThai { get; set; }
        public long? YCVCID { get; set; }
        public string SoYCVC { get; set; }
        public int? LoaiYCVC { get; set; }
        public int? KieuYCVC { get; set; }
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
        public IEnumerable<YCVCLapKHVCDetailItem> KHVCItems { get; set; }
    }
    public class YCVC_Booking_TacNghiepItem: YCVC_Booking_TacNghiep
    { }
    public class YCVC_Booking_HThoiGianTNItem
    {
        public long? BookingID { get; set; }
        //Dau xep
        public DateTime? ThoiGianRoiBai { get; set; }
        public DateTime? ThoiGianDenKho { get; set; }
        public DateTime? ThoiGianBDXep { get; set; }
        public DateTime? ThoiGianKTXep { get; set; }
        public DateTime? ThoiGianRoiKho { get; set; }
        public DateTime? ThoiGianVeBai { get; set; }
        //Dau do
        public DateTime? ThoiGianRoiBaiTra { get; set; }
        public DateTime? ThoiGianDenKhoTra { get; set; }
        public DateTime? ThoiGianBDTra { get; set; }
        public DateTime? ThoiGianKTTra { get; set; }
        public DateTime? ThoiGianRoiKhoTra { get; set; }
        public DateTime? ThoiGianVeBaiTra { get; set; }
        public string DongFilePath { get; set; }
        public string TraFilePath { get; set; }
        public string VienNP { get; set; }
        public decimal? TanTT { get; set; }
        public decimal? SoLuong { get; set; }
        public decimal? TanTT_Ve { get; set; }
        public decimal? SoLuong_Ve { get; set; }
    }
    public class BookingThoiGianTNInput
    {
        public long? BookingID { get; set; }
        public long? KHVCDongID { get; set; }
        public long? KHVCTraID { get; set; }
        public string SoXeDK { get; set; }
        public string SoCONT { get; set; }
        public int? GaTNID { get; set; }
        //Dau xep
        public DateTime?ThoiGianRoiBai { get; set; }
	    public DateTime?ThoiGianDenKho { get; set; }
        public DateTime?ThoiGianBDXep { get; set; }
        public DateTime?ThoiGianKTXep { get; set; }
        public DateTime?ThoiGianRoiKho { get; set; }
        public DateTime?ThoiGianVeBai { get; set; }
        //Dau do
        public DateTime? ThoiGianRoiBaiTra { get; set; }
        public DateTime? ThoiGianDenKhoTra { get; set; }
        public DateTime? ThoiGianBDTra { get; set; }
        public DateTime? ThoiGianKTTra { get; set; }
        public DateTime? ThoiGianRoiKhoTra { get; set; }
        public DateTime? ThoiGianVeBaiTra { get; set; }

        public string Username { get; set; }
        public int? SoLuongTC { get; set; }
        public decimal? TanTT { get; set; }
        public string VienNP { get; set; }

        public string FilePath { get; set; }
    }

}
