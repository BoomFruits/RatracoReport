using RAT.Report.Domain.Entities.DieuHanh;
using RAT.Report.Domain.Entities.YCVC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.DieuHanh
{

    public class BookingTonOutput
    {
        public string TenGa { get; set; }
        public int? GaID { get; set; }
        public IEnumerable<BookingItem> data { get; set; }
    }
    public class BookingTonInput
    {
        public string MaTuyen { get; set; }
        public int? GaID { get; set; }
       
    }

    public class BookingItem : YCVC_Booking
    {
        public string SoYCVC { get; set; }
        public string TenGaDong { get; set; }
        public string KhachHang_Ten { get; set; }
        public int? GaDongID { get; set; }
        public string TenTinhDong { get; set; }
        public long? TinhDongID { get; set; }
        public string TenQuanDong { get; set; }
        public long? QuanDongID { get; set; }
        public string TenPhuongDong { get; set; }
        public long? PhuongDongID { get; set; }
        public string DiaChiDong { get; set; }
        public string TenGaTra { get; set; }
        public int? GaTraID { get; set; }
        public string TenTinhTra { get; set; }
        public long? TinhTraID { get; set; }
        public string TenQuanTra { get; set; }
        public long? QuanTraID { get; set; }
        public string TenPhuongTra { get; set; }
        public long? PhuongTraID { get; set; }
        public string DiaChiTra { get; set; }
        public DateTime? TGDongKH { get; set; }
        public DateTime? TGVanChuyenKH { get; set; }
        public DateTime? TGTraKH { get; set; }
        public short? Chieu { get; set; }

    }
    public class BookingOutput : YCVC_Booking
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
        public string SoYCVC { get; set; }
        public int? LoaiYCVC { get; set; }
        public int? KieuYCVC { get; set; }
        public string DiaChiDongHang { get; set; }
        public DateTime? ThoiGianDong { get; set; }
        public string DiaChiTraHang { get; set; }
        public DateTime? ThoiGianTra { get; set; }
        public string KhachHang_Ten { get; set; }
        public string TenTrangThai { get; set; }

        /// <summary>
        /// so luong yeu cau
        /// </summary>

    }
    public class Booking_TacNghiepOutput : YCVC_Booking_TacNghiep
    {
        public string TenTrangThai { get; set; }
        public int DonGia { get; set; }
    }
    public class BookingAdnHistory : YCVC_Booking
    {
        public IEnumerable<Booking_TacNghiepOutput> history { get; set; }
    }
    public class BookingSearchInput
    {
        public string SoBooking { get; set; }
        public string MaKH { get; set; }
        public int GaDiID { get; set; }
        public int GaDenID { get; set; }
        public DateTime TuNgay { get; set; }
        public DateTime DenNgay { get; set; }
        public string Username { get; set; }
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
    }
    public class LenhCauInput
    {
        public long? TacNghiepID { get; set; }
        public long? LenhCauID { get; set; }
        public DateTime? ThoiGianTN { get; set; }
        public int DonGia { get; set; }
    }
}
