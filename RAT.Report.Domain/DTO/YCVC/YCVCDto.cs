using RAT.Report.Domain.Entities.YCVC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.YCVC
{
    public class YCVCItem:YCVCEntity
    {
        public int TotalCount { get; set; }
        public string TenTinhDong { get; set; }
        public string TenQuanDong { get; set; }
        public string TenPhuongDong { get; set; }
        public string TenTinhTra { get; set; }
        public string TenQuanTra { get; set; }
        public string TenPhuongTra { get; set; }
        public string TenGaDong { get; set; }
        public string TenGaTra { get; set; }
        public string TenKhuCNDong { get; set; }
        public string TenKhuCNTra { get; set; }
        public string TenDiemDong { get; set; }
        public string TenDiemTra { get; set; }
        public string TenGaLVQT { get; set; }
    }
}
