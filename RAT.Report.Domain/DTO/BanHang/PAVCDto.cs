
using RAT.Report.Domain.DTO.Workflow;
using RAT.Report.Domain.Entities.BangGia;
using RAT.Report.Domain.Entities.DanhMuc;
using RAT.Report.Domain.Entities.PAVC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.BanHang
{
    #region PAVCTemplate
    public class PAVCPheDuyetInput
    {
        public string Username { get; set; }
        public int? PAVCTempID { get; set; }
        public int? PAVCID { get; set; }
        public int? taskid { get; set; }
        public bool IsDongY { get; set; }
        public string NoiDung { get; set; }
    }
    public class PAVCTemplateInput
    {
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public int? PAVCTempID { get; set; }
        public short? TrangThai { get; set; }
        public short? HinhThucVC { get; set; }
        public string SearchText { get; set; }
        public string Username { get; set; }
        public short? PageNumber { get; set; }
        public short? PageSize { get; set; }
    }
    public class PAVCTemplateItem : PAVCTemplate
    {
        public int? TotalCount { get; set; }
        public string TenLoaiPAVC { get; set; }
        public string TenHinhThucVC { get; set; }
        public string TenTrangThai { get; set; }
        public string Username { get; set; }
        public short? IsSua { get; set; }
        public short? IsXoa { get; set; }
        public short? IsHuy { get; set; }
        public short? Khoa { get; set; }
        public short? IsPheDuyet { get; set; }
        public short? IsTrinhDuyet { get; set; }
        public long? TaskID { get; set; }
        public IEnumerable<TaskInfo> TaskInfos { get; set; }
    }
    public class PAVCTemplateOutput
    {
        public string msg { get; set; }
        public long? IsOK { get; set; }
        public int? TotalCount { get; set; }
        public IEnumerable<PAVCTemplateItem> data { get; set; }
        public string Username { get; set; }
    }
    #endregion PAVCTemplate
    #region PAVC
    public class PAVCInput
    {
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public int? PAVCID { get; set; }
        public short? TrangThai { get; set; }
        public short? HinhThucVC { get; set; }
        public string SearchText { get; set; }
        public string Username { get; set; }
        public short? PageNumber { get; set; }
        public short? PageSize { get; set; }
    }
    public class PAVCSaoChepInput
    {
        public int? OldPAVCID { get; set; }
        public string Username { get; set; }
    }
    public class PAVCItem : PAVCEntity
    {
        public int? TotalCount { get; set; }
        public int OldPAVCID { get; set; }
        public string TenHinhThucVC { get; set; }
        public string TenPhuongThucGN { get; set; }
        public string TenLoaiPAVC { get; set; }
        public string TenGaDong { get; set; }
        public string TenTinhDong { get; set; }
        public string TenQuanDong { get; set; }
        public string TenPhuongDong { get; set; }
        public string TenKhuCNDong { get; set; }
        public string TenGaTra { get; set; }
        public string TenTinhTra { get; set; }
        public string TenQuanTra { get; set; }
        public string TenPhuongTra { get; set; }
        public string TenKhuCNTra { get; set; }
        public string TenTrangThai { get; set; }
        public string TenGaLVQT { get; set; }
        public string Username { get; set; }
        public short? IsSua { get; set; }
        public short? IsXoa { get; set; }
        public short? IsHuy { get; set; }
        public short? Khoa { get; set; }
        public short? IsPheDuyet { get; set; }
        public short? IsTrinhDuyet { get; set; }
        public long? TaskID { get; set; }
        public IEnumerable<TaskInfo> TaskInfos { get; set; }
    }
    public class PAVCOutput
    {
        public string msg { get; set; }
        public long? IsOK { get; set; }
        public int? TotalCount { get; set; }
        public IEnumerable<PAVCItem> data { get; set; }
        public string Username { get; set; }
    }
    public class PAVCDonGiaInput {
        public long? ID { get; set; }
        public DateTime? TuNgay { get; set; }
        public string MaDichVu { get; set; }
        public string DonViTinh { get; set; }
        public short? SoLuong { get; set; }
        public short? LoaiChiPhi { get; set; }
        public short? GaID { get; set; }
        public long? PhuongID { get; set; }
        public string MaKhuCN { get; set; }
        public short? GaDongID { get; set; }
        public short? GaTraID { get; set; }
        public string Username { get; set; }
    }
    public class PAVCDonGiaItem
    {
        public long? ID { get; set; }
        public short? LoaiChiPhi { get; set; }
        public short? GaDongID { get; set; }
        public int? PhuongDongID { get; set; }
        public short? GaTraID { get; set; }
        public int? PhuongTraID { get; set; }
        public int? DonGia { get; set; }
    }
    public class PAVCDetailItem
    {
        public string TenHinhThucVC { get; set; }
        public string TenLoaiPAVC { get; set; }
        public string TenGaDong { get; set; }
        public string TenTinhDong { get; set; }
        public string TenQuanDong { get; set; }
        public string TenPhuongDong { get; set; }
        public string TenGaTra { get; set; }
        public string TenTinhTra { get; set; }
        public string TenQuanTra { get; set; }
        public string TenPhuongTra { get; set; }
        public string TenTrangThai { get; set; }
        public string TenGaLVQT { get; set; }
        public string KhachHang_MaKH { get; set; }
        public string KhachHang_MST { get; set; }
        public string KhachHang_Ten { get; set; }
        public string KhachHang_DaiDien { get; set; }
        public string KhachHang_DiaChi { get; set; }
    }
    #endregion PAVC
}
