using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.YCVC
{
    public class YCVCEntity
    {
        public long YCVCID { get; set; }
        public long PLHDID { get; set; }
        public string SoYCVC { get; set; }
        public short LoaiYCVC { get; set; }
        public short KieuYCVC { get; set; }
        public string NguoiGui_MaKH { get; set; }
        public string NguoiGui_MST { get; set; }
        public string NguoiGui_Ten { get; set; }
        public string NguoiGui_DiaChi { get; set; }
        public string NguoiGui_Phone { get; set; }
        public string NguoiNhan_MaKH { get; set; }
        public string NguoiNhan_MST { get; set; }
        public string NguoiNhan_Ten { get; set; }
        public string NguoiNhan_DiaChi { get; set; }
        public string NguoiNhan_Phone { get; set; }
        public string KhachHang_MaKH { get; set; }
        public string KhachHang_MST { get; set; }
        public string KhachHang_Ten { get; set; }
        public string KhachHang_DaiDien { get; set; }
        public string KhachHang_DiaChi { get; set; }
        public string KhachHang_Phone { get; set; }
        public string KhachHang_Mail { get; set; }
        public string MaHangTCT { get; set; }
        public string MaHangRAT { get; set; }
        public string TenHang { get; set; }
        public string ChiDanHangHoa { get; set; }
        public string DonViTinh { get; set; }
        public int SoLuong { get; set; }
        public int DonGia { get; set; }
        public int TongTien { get; set; }
        public DateTime ThoiGianDong { get; set; }
        public DateTime ThoiGianTra { get; set; }
        public short HinhThucVC { get; set; }
        public short PhuongThucGN { get; set; }
        public long TinhDongID { get; set; }
        public long QuanDongID { get; set; }
        public long PhuongDongID { get; set; }
        public int GaDongID { get; set; }
        public long TinhTraID { get; set; }
        public long QuanTraID { get; set; }
        public long PhuongTraID { get; set; }
        public int GaTraID { get; set; }
        public int GaLVQTID { get; set; }
        public string GhiChu { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public short TrangThai { get; set; }
        public string NguoiLienHeDH_Ten { get; set; }
        public string NguoiLienHeDH_Phone { get; set; }
        public string DiaChiDongHang { get; set; }
        public string NguoiLienHeTH_Ten { get; set; }
        public string NguoiLienHeTH_Phone { get; set; }
        public string DiaChiTraHang { get; set; }
        public int KhuCNDongID { get; set; }
        public int KhuCNTraID { get; set; }
        public string MaKhuCNDong { get; set; }
        public string MaKhuCNTra { get; set; }
        public int DiemDongID { get; set; }
        public int DiemTraID { get; set; }
    }
    public class YCVC_Booking
    {
        public long? BookingID { get; set; }
        public long? YCVCID { get; set; }
        public int? PLHDID { get; set; }
        public string SoBooking { get; set; }
        public string MaHangTCT { get; set; }
        public string MaHangRAT { get; set; }
        public string TenHang { get; set; }
        public string ChiDangHangHoa { get; set; }
        public string LoaiBaoBi { get; set; }
        public int SoKien { get; set; }
        public string DonViTinh { get; set; }
        public int SoLuong { get; set; }
        public decimal? SoLuongTC { get; set; }
        public decimal? TanTT { get; set; }
        public decimal? TanTC { get; set; }
        public string NguoiApTai_Ten { get; set; }
        public string NguoiApTai_Phone { get; set; }
        public string NguoiApTai_CMT { get; set; }
        public string SoHieuCont { get; set; }
        public string VienNPCONT { get; set; }
        public string SoHieuXe { get; set; }
        public string VienNP { get; set; }
        public int DonGia { get; set; }
        public string ThanhTien { get; set; }
        public string GhiChu { get; set; }
        public short TrangThai { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string DongFilePath { get; set; }
        public string TraFilePath { get; set; }
    }
    public class YCVC_Booking_TacNghiep
    {
        public long ID { get; set; }
        public long? BookingID { get; set; }
        public int? TrangThai { get; set; }
        public long? LenhCauID { get; set; }
        
        public DateTime? ThoiGianTN { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreatedBy { get; set; }
        public string TenTN { get; set; }
       
    }
}
