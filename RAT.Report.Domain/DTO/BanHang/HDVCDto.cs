
using RAT.Report.Domain.DTO.Workflow;
using RAT.Report.Domain.Entities.BangGia;
using RAT.Report.Domain.Entities.DanhMuc;
using RAT.Report.Domain.Entities.HopDong;
using RAT.Report.Domain.Entities.PAVC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.BanHang
{
    public class HopDongItem : HopDongEntity
    {
        public int? TotalCount { get; set; }
        public string TenTinhDong { get; set; }
        public string TenQuanDong { get; set; }
        public string TenPhuongDong { get; set; }
        public string TenGaTra { get; set; }
        public string TenTinhTra { get; set; }
        public string TenQuanTra { get; set; }
        public string TenPhuongTra { get; set; }
        public string TenTrangThai { get; set; }
        public string TenGaLVQT { get; set; }
        public string Username { get; set; }
        public short? IsSua { get; set; }
        public short? IsXoa { get; set; }
        public short? IsHuy { get; set; }
        public short? Khoa { get; set; }
        public short? IsThanhLy { get; set; }
        public IEnumerable<HopDongDetailItem> detail { get; set; }
    }
    public class HopDongDetailItem : HopDong_Detail
    {
        public int? TotalCount { get; set; }
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
        public string TenHinhThucVC { get; set; }
        public string SoBaoGia { get; set; }
        public string TuNgayText { get; set; }
        public string DenNgayText { get; set; }
    }
    public class DieuChinhGiaDauInput
    {
        public int? HopDongID { get; set; }
        public string Username { get; set; }
        public IEnumerable<DieuChinhGiaDauDetailInput> detail {get; set; }
    }
    public class DieuChinhGiaDauDetailInput
    {
        public int? HopDongID { get; set; }
        public long? OldPLHDID { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public short? IsDieuChinh { get; set; }
        public int? DonGia { get; set; }
    }
    public class HopDongInput
    {
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public short? TrangThai { get; set; }
        public string Search { get; set; }
        public short? PageNumber { get; set; }
        public short? PageSize { get; set; }
        public int? HopDongID { get; set; }
        public int? GaDongID { get; set; }
        public int? GaTraID { get; set; }
        public string DonViTinh { get; set; }
    }
    public class HopDongOutput
    {
        public int? TotalCount { get; set; }
        public int? IsOK { get; set; }
        public string msg { get; set; }
        public IEnumerable<HopDongItem> data {get;set;}
    }
}
