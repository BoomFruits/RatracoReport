using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.DanhMuc
{
    public class DMNhanVien
    {
        public DateTime? CreatedDate { get; set; }
        public string MaNV { get; set; }
        public string TenNV { get; set; }
        public string MaDV { get; set; }
    }
}
