using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.DanhMuc
{
    public class DMLoaiTacNghiep
    {
        public int? ID { get; set; }
        public string MaDichVu { get; set; }
        public string LoaiTacNghiep { get; set; }
        public string TenLoaiTacNghiep { get; set; }
        public short? STT { get; set; }
        public short? IsActive { get; set; }      

    }
}
