using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAT.Report.Domain.Entities.DanhMuc
{
    public class DMZone
    {
        public string MaZone { get; set; }
        public string Keyword { get; set; }
        public short? LoaiZone { get; set; }
        public string TenZone { get; set; }
        public long? TinhID { get; set; }
        public long? QuanID { get; set; }
        public long? XaID { get; set; }
        public int? GaID { get; set; }
        public short? IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifyBy { get; set; }
        public DateTime? ModifyDate { get; set; }

    }
}
