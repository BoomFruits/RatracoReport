using RAT.Report.Domain.Entities.DieuHanh;
using RAT.Report.Domain.Entities.YCVC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.DieuHanh
{
   
    public class GSKHVCInput
    {
        public string MaTuyen { get; set; }
        public int? TrangThai { get; set; }
        public int? LoaiKH { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public int? PageSize { get; set; }
        public int? PageNumber { get; set; }

    }
    public class GSKHVCItem: KeHoachVanChuyenEntity
    {
       
        public string TenTrangThai { get; set; }
        public string SoYCVC { get; set; }
        public string KhachHang_Ten { get; set; }
        public string TenHang { get; set; }
        public int? GaDongID { get; set; }
        public string TenGaDong { get; set; }
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
        public string MaKhuCNDong { get; set; }
        public string MaKhuCNTra { get; set; }
        public string TenKhuCNDong { get; set; }
        public string TenKhuCNTra { get; set; }
        public int? TotalCount { get; set; }

    }
    public class GSKHVCOutput
    {
        public int? TotalCount { get; set; }
        public int? IsOK { get; set; }
        public string msg { get; set; }
        public IEnumerable<GSKHVCItem> data { get; set; }
    }

    public class KHVCGiamSatTuyenDetailItem
    {
        public string MaTuyen { get; set; }
        public string TenTuyen { get; set; }
        public int? GaID { get; set; }
        public string TenGa { get; set; }
        public int? STT { get; set; }
        public DateTime? ThoiGianDi { get; set; }
        public string TenKH { get; set; }
        public long? KHVCID { get; set; }
        public long? OldKHVCID { get; set; }
        public int? TrangThai { get; set; }
        public int? SoLuong { get; set; }
        public int? SoLuongDa { get; set; }
    }
    public class KHVCGiamSatTuyenItem
    {
        public string MaTuyen { get; set; }
        public string TenTuyen { get; set; }
        public int? GaID { get; set; }
        public string TenGa { get; set; }
        public int? STT { get; set; }
        public int? BookingTonChan { get; set; }
        public int? BookingTonLe { get; set; }
        public IEnumerable<KHVCGiamSatTuyenDetailItem> detail { get; set; }
    }
    public class KHVCGiamSatTuyenColItem
    {
        public string ColName { get; set; }
        public int? GaID { get; set; }
        public string TenGa { get; set; }
        public int? BookingTonLe { get; set; }
        public int? BookingTonChan { get; set; }
        public DateTime? ThoiGian { get; set; }
        public short? ColIndex { get; set; }
        public short? RowIndex { get; set; }
        public IEnumerable<KHVCGiamSatTuyenDetailItem> Data { get; set; }
    }
    public class KHVCGiamSatTuyenOuput
    {
        public short? IsOK { get; set; }
        public string msg { get; set; }
        public IEnumerable<KHVCGiamSatTuyenColItem> HeaderColumns { get; set; }
        public List<List<KHVCGiamSatTuyenColItem>> RowItems { get; set; }
    }
}
