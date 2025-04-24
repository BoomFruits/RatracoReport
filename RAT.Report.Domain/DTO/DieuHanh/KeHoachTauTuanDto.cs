using RAT.Report.Domain.Entities.DieuHanh;
using RAT.Report.Domain.Entities.YCVC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.DieuHanh
{
    public class GetKHTauTuanItemInput
    {
        public long? TauID { get; set; }
        public string Username { get; set; }
    }
    public class TaoMoiHanhTrinhTauItem
    {
        public string MacTau { get; set; }
        public string MaCTSoHuu { get; set; }
        public DateTime? NgayXP { get; set; }
        public int? GaLTID { get; set; }
        public int? GaGTID { get; set; }
        public string MaTuyen { get; set; }
        public string PhanLoaiXe { get; set; }
        public short? SoLuongXe { get; set; }
        public IEnumerable<TaoMoiThanhPhanTauItem> TPTauItems { get; set; }
    }
    public class TaoMoiThanhPhanTauItem
    {
        public long? TNTauID { get; set; }
        public long? TauID { get; set; }
        public string PhanLoaiXe { get; set; }
        public short? SoLuong { get; set; }
    }
    public class TaoMoiHanhTrinhTauInput
    {
        public IEnumerable<TaoMoiHanhTrinhTauItem> TauItems { get; set; }
        public IEnumerable<TaoMoiThanhPhanTauItem> TPTauItems { get; set; }
        public string Username { get; set; }
    }
    public class KHTauTuanViewInput
    {
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public string MacTau { get; set; }
        public string MaTuyen { get; set; }
        public string Username { get; set; }
        public long? TauID { get; set; }
    }
    public class KHTauTuanDetailBookingTonItem
    {
        public string MaTuyen { get; set; }
        public string TenTuyen { get; set; }
        public short? GaID { get; set; }
        public string TenGa { get; set; }
        public short? STT { get; set; }
        public long? TauID { get; set; }
        public short? BookingTonChan { get; set; }
        public short? BookingTonLe { get; set; }
      
    }
    public class KHTauTuanDetailSoLuongItem
    {
        public string MaTuyen { get; set; }
        public string TenTuyen { get; set; }
        public short? GaID { get; set; }
        public string TenGa { get; set; }
        public short? STT { get; set; }
        public long? TauID { get; set; }
        public short? SoLuongLen { get; set; }
        public short? SoLuongXuong { get; set; }
        public short? SoLuong { get; set; }
    }
    public class KHTauTuanDetailItem
    {
        public string MaTuyen { get; set; }
        public string TenTuyen { get; set; }
        public short? GaID { get; set; }
        public string TenGa { get; set; }
        public short? STT { get; set; }
        public short? BookingTonLe { get; set; }
        public short? BookingTonChan { get; set; }
        public long? TauID { get; set; }
        public string MacTau { get; set; }
        public string MacTauText { get; set; }
        public string MacTauDisplay { get; set; }
        public string TenGaLT { get; set; }
        public short? GaLTID { get; set; }
        public string TenGaGT { get; set; }
        public short? GaGTID { get; set; }
        public short? MacTauValue { get; set; }
        public DateTime? NgayXP { get; set; }
        public string MaCTSoHuu { get; set; }
        public short? Chieu { get; set; }
        public string PhanLoaiXe { get; set; }
        public short? SoLuongXe { get; set; }
        public DateTime? ThoiGianDi { get; set; }
        public DateTime? ThoiGianDen { get; set; }
        public short? KHVCSoLuong { get; set; }
        public short? KHVCSoLuong_Len { get; set; }
        public short? KHVCSoLuong_Xuong { get; set; }
    }
    public class KHTauTuanItem
    {
        public string MaTuyen { get; set; }
        public string TenTuyen { get; set; }
        public short? GaID { get; set; }
        public string TenGa { get; set; }
        public short? STT { get; set; }
        public short? BookingTonLe { get; set; }
        public short? BookingTonChan { get; set; }
        public IEnumerable<KHTauTuanDetailItem> TauItems { get; set; }
    }
    public class KHTauTuanColItem
    {
        public string ColName { get; set; }
        public short? GaID { get; set; }
        public string TenGa { get; set; }
        public short? BookingTonLe { get; set; }
        public short? BookingTonChan { get; set; }
        public DateTime? ThoiGian { get; set; }
        public short? ColIndex { get; set; }
        public short? RowIndex { get; set; }
        public IEnumerable<KHTauTuanDetailItem> TauItems { get; set; }
    }
    public class KHTuaTuanViewOuput
    {
        public short? IsOK { get; set; }
        public string msg { get; set; }
        public IEnumerable<KHTauTuanColItem> HeaderColumns { get; set; }
        public List<List<KHTauTuanColItem>> RowItems { get; set; }
    }
    public class ChiTietThanhPhanTauOutput
    {
        public long? TauID { get; set; }
        public string MacTau { get; set; }
        public string TenGaLT { get; set; }
        public short? GaLTID { get; set; }
        public string TenGaGT { get; set; }
        public short? GaGTID { get; set; }
        public DateTime? NgayXP { get; set; }
        public string MaCTSoHuu { get; set; }
        public short? Chieu { get; set; }
        public string PhanLoaiXe { get; set; }
        public short? SoLuongXe { get; set; }
        public IEnumerable<KHTauTuanDetailItem> detail { set; get; }
    }
}
