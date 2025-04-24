using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.DTO.DanhMuc.Old
{
    public struct LoaiVeBS
    {
        public short MaLoai { get; set; }
        public string TenLoai { get; set; }
        public bool Active { get; set; }
        public short Loai { get; set; }
        public short? LoaiHoaDon { get; set; }
    }
}
