using RAT.Report.Domain.Entities.ThucHien;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.ThucHien
{
    public class ThucHienTaskOutput
    {
        public int? TotalCount { get; set; }
        public int? IsOK { get; set; }
        public string msg { get; set; }
        public IEnumerable<ThucHienTaskItem> data { get; set; }
    }
    public class ThucHienTaskInput
    {
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public string MaLenh { get; set; }
        public short? TrangThai { get; set; }
        public int? GaID { get; set; }
        public string SoYCVC { get; set; }
        public int? PageSize { get; set; }
        public int? PageNumber { get; set; }
        public string Username { get; set; }

    }

    public class ThucHienTaskItem : ThucHienTask
    {
        public long? LenhCauID { get; set; }
        public string TenLenh { get; set; }
        public short? LoaiKH { get; set; }
        public string SoYCVC { get; set; }
        public long? YCVCID { get; set; }
        public string SoBooking { get; set; }
        public string SoHieuXe { get; set; }
        public string SoXeDK { get; set; }
        public string SoCont { get; set; }
        public string TenHang { get; set; }
        public decimal? TanTT { get; set; }
        public string TenTrangThai { get; set; }
        public string TenGaTN { get; set; }
        public string KhachHang_Ten { get; set; }
        public string KhachHang_DaiDien { get; set; }
        public string KhachHang_Phone { get; set; }
        public string TenTinhDong { get; set; }
        public string TenQuanDong { get; set; }
        public string TenPhuongDong { get; set; }
        public string TenKhuCNDong { get; set; }
        public string TenDiemDong { get; set; }
        public string DiaChiDongHang { get; set; }
        public string TenTinhTra { get; set; }
        public string TenQuanTra { get; set; }
        public string TenPhuongTra { get; set; }
        public string TenKhuCNTra { get; set; }
        public string TenDiemTra { get; set; }
        public string DiaChiTraHang { get; set; }

        public int? TotalCount { get; set; }

    }
    public class XNXDKVeGaInput
    {
        public long? KHCVID { get; set; }
        public string SoCont { get; set; }
        public string SoXeDK { get; set; }
        public string SoVNP { get; set; }
        public DateTime? TGCauRong { get; set; }
        public DateTime? TGRoiBai { get; set; }
        public DateTime? TGDenKho { get; set; }
        public DateTime? TGBatDauXep { get; set; }
        public DateTime? TGXepXong { get; set; }
        public DateTime? TGRoiKho { get; set; }
        public DateTime? TGVeBai { get; set; }
        public string Username { get; set; }

    }

    public class TaoMoiLenhDauXepInput
    {
        public long? OldTaskID { get; set; }
        public long? TaskID { get; set; }
        public long? KHVCID {get;set;}
        public string MaLenh {get;set;}
	    public string MaNCC {get;set;}
        public int? GaID { get; set; }

        public string Username { get; set; }
        public IEnumerable<TaoMoiLenhDauXepDetailInput> detail { get; set; }
    }
    public class TaoMoiLenhDauXepDetailInput
    {
        public string SoXeDK { get; set; }
        public string SoXeDK2 { get; set; }
        public string SoHieuXe { get; set; }
        public string SoHieuXe2 { get; set; }
        public string SoCONT { get; set; }
        public string Username { get; set; }
        public decimal? TanTT { get; set; }
        public string ThoiGianTN { get; set; }
        public int? IsTraDong { get; set; }
    }

    public class TaoMoiLenhXepTaiGaInput
    {
        public string KHVCID { get; set; }
        public string MaLenh { get; set; }
        public string MaNCC { get; set; }
        public int? GaID { get; set; }

        public string Username { get; set; }
        public IEnumerable<TaoMoiLenhXepTaiGaDetailInput> detail { get; set; }
    }
    public class TaoMoiLenhXepTaiGaDetailInput
    {
        public string SoHieuXe { get; set; }
        public string SoCONT { get; set; }
        public string SoXeCau { get; set; }
        public string Username { get; set; }
        public string VienNP { get; set; }
        public decimal? TanTT { get; set; }
        public decimal? SoLuongTC { get; set; }
        public string ThoiGianTN { get; set; }
        
    }
}
