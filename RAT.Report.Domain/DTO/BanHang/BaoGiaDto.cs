
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
    public class BaoGiaItem : BaoGiaEntity
    {
        public int? TotalCount { get; set; }
        public string TenLoaiBangGia { get; set; }
        public string TenTrangThai { get; set; }
        public string Username { get; set; }
        public short? IsSua { get; set; }
        public short? IsXoa { get; set; }
        public short? IsHuy { get; set; }
        public short? Khoa { get; set; }
        public short? IsTrinhDuyet { get; set; }
        public short? IsPheDuyet { get; set; }
        public IEnumerable<BaoGiaDetailItem> detail { get; set; }
        public IEnumerable<TaskInfo> TaskInfos { get; set; }
        public long? TaskID { get; set; }
        public short? IsDieuChinh { get; set; }
    }
    public class BaoGiaDetailItem : BaoGia_Detail
    {
        public int? TotalCount { get; set; }
        public string SoBaoGia { get; set; }
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
        public string KhachHang_MaKH { get; set; }
        public string KhachHang_Ten { get; set; }
        //public int? PAVCID { get; set; }
        public string SoPAVC { get; set; }
        public long? OldID { get; set; }
    }
    public class BaoGiaInput
    {
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public short? TrangThai { get; set; }
        public string Search { get; set; }
        public short? PageNumber { get; set; }
        public short? PageSize { get; set; }
        public int? BaoGiaID { get; set; }
        public string Username { get; set; }
    }
    public class BaoGiaOutput
    {
        public int? TotalCount { get; set; }
        public int? IsOK { get; set; }
        public string msg { get; set; }
        public IEnumerable<BaoGiaItem> data {get;set;}
    }
    public class BaoGiaDetailOuput
    {
        public int? TotalCount { get; set; }
        public int? IsOK { get; set; }
        public string msg { get; set; }
        public IEnumerable<BaoGiaItemGroupDetail> data { get; set; }
    }
    public class BaoGiaItemGroupDetail
    {
        public int? BaoGiaID { get; set; }
        public string SoBaoGia { get; set; }
        public string KhachHang_MaKH { get; set; }
        public string KhachHang_Ten { get; set; }
        public IEnumerable<BaoGiaDetailItem> detail { get; set; }
    }
    public class BaoGiaPheDuyetInput
    {
        public string Username { get; set; }
        public int? BaoGiaID { get; set; }
        public int? taskid { get; set; }
        public bool IsDongY { get; set; }
        public string NoiDung { get; set; }
    }
}
