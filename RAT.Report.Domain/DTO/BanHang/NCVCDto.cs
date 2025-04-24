using RAT.Report.Domain.Entities.NCVC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.BanHang
{
    public class NCVCInput
    {
        public string KhachHang_MaKH { get; set; }
        public int? TrangThai { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public int? PageSize { get; set; }
        public int? PageNumber { get; set; }

    }
    public class NCVCOutput : NCVCEntity
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
    }
}
