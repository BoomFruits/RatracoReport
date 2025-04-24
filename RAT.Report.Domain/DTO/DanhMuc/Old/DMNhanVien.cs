using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.DanhMuc.Old
{
    public struct DMNhanVien
    {
        public string Email { get; set; }
        public string MaNV { get; set; }
        public string TenNV { get; set; }
        public string MaDV { get; set; }
        public bool Active { get; set; }
        public bool ActiveMobile { get; set; }
        public bool ActiveDaiLy { get; set; }
        public string SoDienThoai { get; set; }
        public string MaCT { get; set; }
        public string MaCV { get; set; }
        public string TenDV { get; set; }
    }
}
