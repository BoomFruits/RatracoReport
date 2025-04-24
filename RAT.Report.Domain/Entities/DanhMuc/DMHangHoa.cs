using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.DanhMuc
{
    public class DMHangHoa
    {
        public string MaHangRAT { get; set; }
        public string TenHang { get; set; }
        public string MaHangTCT { get; set; }
        public string Keyword { get; set; }
        public string CreatedBy { get; set; }     
        public DateTime? CreatedDate { get; set; }
    }
}
