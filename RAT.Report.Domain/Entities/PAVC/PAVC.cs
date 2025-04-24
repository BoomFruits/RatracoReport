using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.PAVC
{
    public class PAVCEntity
    {
        public long? PAVCID { get; set; }
        public long? PAVCTempID { get; set; }
        public string SoPAVC { get; set; }
        public short? LoaiPAVC { get; set; }
        public short? HinhThucVC { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public string KhachHang_MaKH { get; set; }
        public string KhachHang_MST { get; set; }
        public string KhachHang_Ten { get; set; }
        public string KhachHang_DaiDien { get; set; }
        public string KhachHang_DiaChi { get; set; }
        public string MaHangRAT { get; set; }
        public string MaHangTCT { get; set; }
        public string TenHangRAT { get; set; }
        public string ChiDanHangHoa { get; set; }
        public string DonViTinh { get; set; }
        public short? PhuongThucGN { get; set; }
        public int? TyGiaUSD { get; set; }
        public int? TyGiaEUR { get; set; }
        public int? TyGiaNVY { get; set; }
        public long? TinhDongID { get; set; }
        public long? QuanDongID { get; set; }
        public long? PhuongDongID { get; set; }
        public int? GaDongID { get; set; }
        public string DiaChiDong { get; set; }
        public int? KhuCNDongID { get; set; }
        public string MaKhuCNDong { get; set; }
        public long? TinhTraID { get; set; }
        public long? QuanTraID { get; set; }
        public long? PhuongTraID { get; set; }
        public int? GaTraID { get; set; }
        public string DiaChiTra { get; set; }
        public int? KhuCNTraID { get; set; }
        public string MaKhuCNTra { get; set; }
        public int? GaLVQTID { get; set; }
        public int? GiaVon { get; set; }
        public int? GiaBan { get; set; }
        public string MaDV { get; set; }
	    public string CreatedBy { get; set; }
	    public DateTime? CreatedDate { get; set; }
	    public string ModifiedBy { get; set; }
	    public DateTime? ModifiedDate { get; set; }
	    public string GhiChu { get; set; }
	    public short? TrangThai { get; set; }
        public IEnumerable<PAVC_Detail> detail { get; set; }
    }
    public class PAVC_Detail
    {
        public long? ID { get; set; }
        public string MaDichVu { get; set; } 
	    public string  TenChiPhi { get; set; }
        public short?	LoaiChiPhi { get; set; }
        public string DonViTinh { get; set; }
	    public short?  SoLuong { get; set; }
        public int? DonGia { get; set; }
        public short? IsTemplate { get; set; }
        public short? IsTaiGa { get; set; }
        public string  GhiChu { get; set; }
    }
}
